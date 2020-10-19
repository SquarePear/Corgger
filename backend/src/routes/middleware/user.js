import { User } from '../../db/models'
import { createTag } from '../../db/utils/user'
import { sign } from 'jsonwebtoken'

export function checkDuplicate(req, res, next) {
  if (!req.body.tag) req.body.tag = createTag()

  User.findOne({
    username: req.body.username,
    tag: req.body.tag,
  }).exec((err, user) => {
    if (err) return res.status(500).send({ message: err })

    if (user)
      return res.status(400).send({
        message:
          'Username and tag combo is already in use! Did you mean to sign in instead?',
      })

    next()
  })
}

export function signup(req, res, next) {
  const user = new User({
    displayname: req.body.displayname,
    username: req.body.username,
    tag: req.body.tag,
  })

  user.createPassword(req.body.password)

  user.save((err, user) => {
    if (err) return res.status(500).send({ message: err })

    next()
  })
}

export function signin(req, res) {
  User.findOne({
    username: req.body.username,
    tag: req.body.tag,
  }).exec((err, user) => {
    if (err) return res.status(500).send({ message: err })

    if (!user) return res.status(404).send({ message: 'User Not found.' })

    if (!user.comparePassword(req.body.password))
      return res.status(401).send({
        accessToken: null,
        message: 'Invalid Password!',
      })

    const token = sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24, // 24 hours
    })

    res.status(200).send({
      id: user._id,
      displayname: user.displayname,
      username: user.username,
      tag: user.tag,
      accessToken: token,
    })
  })
}