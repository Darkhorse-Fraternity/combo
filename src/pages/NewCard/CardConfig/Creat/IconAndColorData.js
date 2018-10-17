import svgs from '../../../../../source/svgs'
import colorsData from '../../../../../source/colors'

const shuffle = function(self) {
  let m = self.length, i;
  while (m) {
    i = (Math.random() * m--) >>> 0;
    [self[m], self[i]] = [self[i], self[m]]
  }
  return self;
}

export const icons = shuffle(Object.keys(svgs).map(name=>{return {
  name,
  size:30
}}))



const colorNames = ['DELTAORANGE', 'RED',
  'PINK', 'PURPLE', 'INDIGO', 'LIGHTBLUE', 'CYAN', 'TEAL', 'LIGHTGREEN',
  'LIME', 'YELLOW', 'AMBER', 'ORANGE', 'DEEPORANGE', 'BROWN', 'BLUEGREY']
const colorType = ['100', '200', '300', '400', '500']

const ColorData = []

colorNames.forEach((name) => {
  colorType.forEach((type) => {
    ColorData.push(colorsData[name][type])
  })

})


export const colors  = shuffle(ColorData)
colors.push('#7e7e7e')

