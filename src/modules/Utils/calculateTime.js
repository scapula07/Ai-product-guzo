export const calculateTimeOfPost=(timestamp)=>{
    // const postDate = new Date(createdAt);
    // const currentDate = new Date();
    
  
    // const timeDifference = currentDate - postDate;
    
  
    // const seconds = Math.floor(timeDifference / 1000);
    // const minutes = Math.floor(seconds / 60);
    // const hours = Math.floor(minutes / 60);
    // const days = Math.floor(hours / 24);
    
    // let agoString = "";
    
    // if (days > 0) {
    //   agoString = `${days} day${days !== 1 ? "s" : ""} ago`;
    // } else if (hours > 0) {
    //   agoString = `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    // } else if (minutes > 0) {
    //   agoString = `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    // } else {
    //   agoString = `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
    // }
    // return agoString;
    // console.log(`The post was created ${agoString}.`);



    // const timestamp = 1695203784;

// Current time in Unix timestamp format
const now = Math.floor(Date.now() / 1000);

// Calculate the time difference in seconds
const diffInSeconds = now - timestamp;

// Define time intervals in seconds
const minute = 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;

// Determine the appropriate time unit
let result;
if (diffInSeconds < minute) {
  result = 'just now';
} else if (diffInSeconds < hour) {
  const minutes = Math.floor(diffInSeconds / minute);
  result = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
} else if (diffInSeconds < day) {
  const hours = Math.floor(diffInSeconds / hour);
  result = `${hours} hour${hours > 1 ? 's' : ''} ago`;
} else if (diffInSeconds < week) {
  const days = Math.floor(diffInSeconds / day);
  result = `${days} day${days > 1 ? 's' : ''} ago`;
} else {
  result = 'more than a week ago';
}

return result
    
  
  }