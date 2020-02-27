import ky from 'ky';

export async function getTimeline() {
	const response = await ky.get('http://api.fanfou.com/statuses/user_timeline.json?id=wangxing&count=5');
  // const jsonString = response.body;
  const result = await response.json();
  console.log(result);
  // const timeline = JSON.parse(jsonString);  // Array

  return result;
  //return timeline.map(status => status)
  // return  timeline.map(status => { return status.text })
}
