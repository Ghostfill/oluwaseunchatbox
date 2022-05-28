// const options = {
//   method: 'GET',
//   headers: {
//     'X-RapidAPI-Host': 'covid-19-tracking.p.rapidapi.com',
//     'X-RapidAPI-Key': '8224b67c7amsh3faaf7ded5854cdp156696jsne592b8bea50c',
//   },
// }

// fetch('https://covid-19-tracking.p.rapidapi.com/v1/usa', options)
//   .then((response) => response.json())
//   .then((response) =>
//     chatContainer.append(response)
//   )
//   .catch((err) => console.error(err))

// const treatment =
const publicMeasures = {
  Quarantine: `means restricting activities or separating people who are 
not ill but may have been exposed to COVID-19.`,
  Isolation: `means separating people who are ill with symptoms of 
COVID-19`,
  'Physical distancing': `means being physically apart. WHO recommends 
keeping at least 1-metre distance from others`,
  'Contact tracing': `helps to identify individuals who may have been 
exposed to COVID-19 in order to quickly isolate them.`,
}

const spreadActivitie = [
  'Mass-gatherings',
  'Ageing population',
  'Displaced populations',
  'International exposure',
  'Density of urban areas',
  'Weak public health systems',
  'Lack of government transparency',
  'Lack of press freedom',
]

const symptoms = {
  fever: 88,
  cough: 68,
  fatigue: 38,
  'shortness of breath': 19,
  'muscle/joint pain': 15,
  'sore throat': 14,
  headache: 14,
  chills: 11,
  'nausea/vomitting': 5,
  'nausal congestion': 5,
  diarhea: 4,
  haemoptysis: 1,
  'conjucvictal congestion': 1,
}

const greetings = ['hello', 'hi', 'good morning', 'hey']
const micellaneous = ['sure..', 'exactly.', "couldn't agree more!"]

const queAns = {
  'What is Covid19': `<h3>Covid-19</h3><ul class='symptom covid'>
  <li>
  COVID-19 is the infectious disease caused by the most recently 
discovered coronavirus.<li/>
<li>
This new virus and disease were unknown before the outbreak 
began in Wuhan, China, in December 2019</li>
<li>
COVID-19 is now a pandemic affecting many countries globally
</li>
<li>
The coronavirus can be spread from person to person. It is diagnosed with a test.
</li>
</ul>`,
  'What are the common symptoms of Covid?': `<h3>Covid Symptoms</h3><ul class='symptom'>${Object.entries(
    symptoms
  )
    .map(([sym, perc]) => `<li ><span>${sym}:</span>${perc}%</li>`)
    .join('')}</ul>`,
  'What is its treatment?': `<h3>Treatment</h3><p>Currently, there are no antiviral drugs licensed for treating COVID-19.</p>
  <p> 
However, Research is ongoing to determine if existing drugs can be re-purposed to 
effectively treat COVID-19</p>
<p>
Currently Treatment for COVID-19 depends on the severity of the infection. For milder illness, resting at home and taking medicine to reduce fever is often sufficient. More severe cases may require hospitalization, with treatment that might include intravenous medications, supplemental oxygen, assisted ventilation and other supportive measures
</p>`,
  'How does the coronavirus spread?': `
<h3>How It Spread</h3>
<p>
As of now, researchers know that the coronavirus is spread through droplets and virus particles released into the air when an infected person breathes, talks, laughs, sings, coughs or sneezes. Larger droplets may fall to the ground in a few seconds, but tiny infectious particles can linger in the air and accumulate in indoor places, especially where many people are gathered and there is poor ventilation. This is why mask-wearing, hand hygiene and physical distancing are essential to preventing COVID-19.</p>
`,
  'What facilitates its spread?': `<h3>Activities That Help it Spred</h3><ul class='symptom spread'>
${spreadActivitie.map((ac) => `<li>${ac}</li>`).join('')}
</ul>`,
  'What are the personal Measures to undertake?': `
<h3>Personal Measure</h3>
<p>Hand and respiratory hygiene is 
important at ALL times and is the best 
way to protect yourself and others</p>
<p>When possible maintain at least 1 meter 
distance between yourself and others. </p>
<p>
It is also important to receive a booster when you are eligible. You can get any of these three authorized or approved vaccines, but the CDC explains that Pfizer and Moderna are preferred in most situations.</p>
<p>
In addition, it helps to keep up with other safety precautions, such as following testing guidelines, wearing a mask, washing your hands and practicing physical distancing.</p>
`,
  'What are the public measures to curb it?': `
<h3>Public Helath Measures</h3>
<ul class='symptom p-measure'>
${Object.entries(publicMeasures)
  .map(([key, desc]) => `<li><span>${key}:</span> ${desc}</li>`)
  .join('')}
</ul>
`,
}

const faq = document.getElementById('faq')
const chatContainer = document.getElementById('chat__container')

const typing = document.getElementById('loading')

const faqHandler = (que, ans) => (e) => {
  chatContainer.appendChild(getChatElement(que))

  appendChild(getChatElement(ans, true))
  e.target.remove()
}

const random = (array) => array[Math.round(Math.random() * array.length)]

const getAnswer = (question) => {
  if (greetings.includes(question))
    if (chatContainer.children.length === 1)
      return `
  <p>
  <h3>Hello, I'am Droid</h3>
  <p>I am here to help you refresh your basic Knowledge about Covid19</p>
  `
    else return random(greetings)
  else return random(micellaneous)
}

const appendChild = (child) => {
  typing.innerHTML = 'typing'
  setTimeout(() => {
    chatContainer.append(child)
    typing.innerHTML = ''
    window.scrollTo(0, document.body.scrollHeight)
    chatContainer.scrollTo(
      chatContainer.scrollWidth,
      chatContainer.scrollHeight
    )
  }, 500)
}

const handleSubmit = (e) => {
  e.preventDefault()
  const { message } = e.target
  const msg = getChatElement(message.value)
  chatContainer.append(msg)

  appendChild(getChatElement(getAnswer(message.value.toLowerCase()), true))
  e.target.reset()
}

const getChatElement = (message, isBot = false) => {
  const msg = document.createElement('div')
  msg.className = `chats ${!isBot && 'user'}`
  msg.innerHTML = `
  <span class='chats__name'>${isBot ? 'Droid' : 'You'}</span>
    <p>${message}</p>
    <span class='chats__timestamp'>${new Date().toUTCString()}</span>
    `
  return msg
}

const reset = () => {
  chatContainer.innerHTML = ''
  faq.innerHTML = ''
  initialLoad()
}

document.getElementById('chat__form').addEventListener('submit', handleSubmit)

const initialLoad = () => {
  for (const [key, value] of Object.entries(queAns)) {
    const q = document.createElement('li')
    q.innerHTML = key
    q.addEventListener('click', faqHandler(key, value))

    faq.append(q)
  }
}

initialLoad()
