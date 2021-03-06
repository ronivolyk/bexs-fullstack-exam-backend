import express from 'express';
import { connect as connectMongo } from './mongo/Mongo';
import requestController from './RequestController';
import responseController from './ResponseController';
import answersController from './answers/AnswersController';
import questionsController from './questions/QuestionsController';

const PORT = 8080;

const app = express();

app.use(express.json());
app.use(requestController);
app.use(answersController);
app.use(questionsController);
app.use(responseController);

init();

async function init() {
    try {
        await connectMongo();
        app.listen(PORT, () => console.log(`Server listening to port ${PORT}`));
    } catch (e) {
        finishWithError(e);
    }
}

function finishWithError(error) {
    console.error('Error', error);
    process.exit(1);
}