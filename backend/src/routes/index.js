import {
  checkDuplicate,
  followUser,
  postMessage,
  signin,
  signup,
} from './middleware/user'
import { checkToken, requireToken } from './middleware/auth'

import { app } from '../'

app.use(checkToken)

app.get('/', (req, res) => {
  res.json({ message: req.body })
})

app.post('/auth/signup', checkDuplicate, signup, signin)

app.post('/auth/signin', signin)

app.post('/message/post', requireToken, postMessage)

app.post('/user/follow', requireToken, followUser)
