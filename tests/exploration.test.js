import request from 'supertest'
import app from '../src/app'
import { setupDatabase } from './fixtures/db'
import explorationRequest from './fixtures/explorationRequest'

beforeEach(setupDatabase)

test('Should validate auth explorations endpoint', async () => {
    
    const response = await request(app).get('/api/explorations').set({
        "auth": `Bearer ${explorationRequest.auth}`,
        "X-ExplorationRequest": JSON.stringify(explorationRequest["X-ExplorationRequest"])
    }).expect(401)

})
