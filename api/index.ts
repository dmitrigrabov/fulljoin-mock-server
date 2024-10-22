import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import data from './data.json'
import { cors } from 'hono/cors'

export const config = {
  runtime: 'edge'
}

const app = new Hono().basePath('/api')

app.use(
  '/api/*',
  cors({
    origin: '*',
    allowMethods: ['*'],
    exposeHeaders: ['*'],
    maxAge: 600,
    credentials: true,
  })
)

app.get('/', (c) => {
  return c.json(addRandomData(data))
})

export default handle(app)

const addRandomData = (d: typeof data) => {
  const keys = Object.keys(d)

  const size = d[keys[0] as  keyof typeof d].length

  const randomParam = getRandomValue(extraParams);

  return {
    ...data,
    [randomParam.name]: Array.from(Array(size).keys(), () => {
      return getRandomValue(randomParam.values);
    })

  }
}

const getRandomValue = <T>(values: T[]) => {
  return values[Math.floor(Math.random() * values.length)];
}

const extraParams = [{
  name: 'colors',
  values: ['red', 'orange', 'yellow', 'green', 'blue', 'purple']
}, {
  name: 'plans',
  values: ['beginner', 'startup', 'team', 'business', 'enterprise']
}, {
  name: 'channels',
  values: ['email', 'sms', 'in-app', 'push', 'search', 'inbound', 'referral']
}]


