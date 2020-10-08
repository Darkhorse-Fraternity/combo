export const randFlowCoverColor = ()=>{
  const rNumber = Math.floor(Math.random()*7);
  console.log('rNumber',rNumber);
  
    switch (rNumber) {
        case 0 : return '#AFCCCB'
        case 1 : return '#C2B1AE'
        case 2 : return '#F0C9C5'
        case 3 : return '#C7BCCF'
        case 4 : return '#F2D4C7'
        case 5 : return '#B6D4CD'
        case 6 : return '#B2D3D9';
        case 7 : return '#B0B8C8';
       default : return '#AFCCCB';
    }
}