const colors = ["red","blue","green"];

const randomcolor = () => {
 return colors[Math.floor(Math.random()*colors.length)];
};

module.exports =randomcolor;