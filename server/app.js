import express from 'express';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../client', 'dist')));


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration);

app.listen(PORT, () => {
    console.log(`Server has started running on port ${PORT}.`)
})

app.get('/', (req, res) => {
    console.log('Server has received http request.');
})

app.post('/image', async (req, res) => {
    try {
        const prompt = req.body.prompt;
        const aiResponse = await openai.createImage({
            prompt,
            n: 1,
            size: '512x512',
        })
        const image = aiResponse.data.data[0].url;
        res.send({ image });
    } catch (error) {
        console.log(error)
        res.status(500).send(error?.response.data.error.message || 'Server error.')
    }
})

