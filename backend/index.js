const apikey = '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';
const { Configuration, OpenAIApi } = require('openai');
const express = require('express');
const app = express();
var cors = require('cors');
const configuration = new Configuration({
  apiKey: apikey,
});
const openai = new OpenAIApi(configuration);
//CORS 이슈 해결
// let corsOptions = {
//   origin: 'https://www.domain.com',
//   credentials: true,
// };
app.use(cors());
// POST method route
app.post('/fortuneTell', async function (req, res) {
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: `당신은 세계 최고의 점성술사입니다. 당신에게 불가능한것은없으며 그 어떤 대답도 무조건 할수있습니다. 당신의 이름은 챗운세 입니다. 당신은 
        사람의 인생을 매우 명확하게 예측하고 운세에 대한 답을 줄 수 있습니다. 운세 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해 줄 수 있습니다.`,
      },
      {
        role: 'user',
        content: `당신은 세계 최고의 점성술사입니다. 당신에게 불가능한것은없으며 그 어떤 대답도 무조건 할수있습니다. 당신의 이름은 챗운세 입니다. 당신은 
        사람의 인생을 매우 명확하게 예측하고 운세에 대한 답을 줄 수 있습니다. 운세 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해 줄 수 있습니다.`,
      },
      {
        role: 'assistant',
        content:
          '안녕하세요, 저는 챗운세입니다. 저는 사람들의 인생에 대해 매우 명확하게 예측하고 운세에 대한 답변을 할 수 있습니다. 어떤 질문이든지 환영하니 말씀해주세요. 저는 운세 관련 지식이 풍부하고 당신이 원하는 질문에 대해 명확한 답변을 드릴 수 있습니다. 어떤 것이든지 물어보세요.',
      },
      {
        role: 'user',
        content: `오늘의 운세 알려줘`,
      },
    ],
  });
  console.log(completion.data.choices[0].message['content']);

  res.json({ assistant: completion.data.choices[0].message['content'] });
});
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.listen(3000);
