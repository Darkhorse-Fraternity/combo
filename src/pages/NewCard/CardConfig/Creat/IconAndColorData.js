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

const key = 'sun'
const svgkeys = shuffle(Object.keys(svgs))
for (let i = 0; i < svgkeys.length; i++) {
  if (svgkeys[i] === key) {
    svgkeys.splice(i, 1);
    break;
  }
}
svgkeys.unshift(key);


const icons = svgkeys.map(name => {
  return {
    name,
    size: 30
  }
})

const iconsCutThree = []

for (let i = 0, len = icons.length; i < len; i += 3) {
  iconsCutThree.push(icons.slice(i, i + 3));
}


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


const colors = shuffle(ColorData)
colors.push('#7e7e7e')

const colorsCutThree = []

for (let i = 0, len = icons.length; i < len; i += 3) {
  colorsCutThree.push(colors.slice(i, i + 3));
}


export {
  icons,
  iconsCutThree,
  colors,
  colorsCutThree
}
