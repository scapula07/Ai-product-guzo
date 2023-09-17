export const calculateTimeOfPost=(createdAt)=>{
    const postDate = new Date(createdAt);
    const currentDate = new Date();
    
  
    const timeDifference = currentDate - postDate;
    
  
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    let agoString = "";
    
    if (days > 0) {
      agoString = `${days} day${days !== 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      agoString = `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      agoString = `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    } else {
      agoString = `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
    }
    return agoString;
    console.log(`The post was created ${agoString}.`);
    
  
  }