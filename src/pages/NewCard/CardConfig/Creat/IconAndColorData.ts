import svgs from '../../../../../source/icons';
import colorsData from '../../../../../source/colors';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const shuffle = function (self: any[]) {
  let m = self.length,
    i;
  while (m) {
    i = (Math.random() * m--) >>> 0;
    [self[m], self[i]] = [self[i], self[m]];
  }
  return self;
};

const key = 'sun';
const svgkeys: string[] = shuffle(Object.keys(svgs));
for (let i = 0; i < svgkeys.length; i++) {
  if (svgkeys[i] === key) {
    svgkeys.splice(i, 1);
    break;
  }
}
svgkeys.unshift(key);

interface IconsType {
  name: string;
  size: number;
}

const icons: IconsType[] = svgkeys.map((name) => {
  return {
    name,
    size: 30,
  };
});

const iconsCutThree: IconsType[][] = [];

for (let i = 0, len = icons.length; i < len; i += 3) {
  iconsCutThree.push(icons.slice(i, i + 3));
}

const colorNames = [
  'DELTAORANGE',
  'RED',
  'PINK',
  'PURPLE',
  'INDIGO',
  'LIGHTBLUE',
  'CYAN',
  'TEAL',
  'LIGHTGREEN',
  'LIME',
  'YELLOW',
  'AMBER',
  'ORANGE',
  'DEEPORANGE',
  'BROWN',
  'BLUEGREY',
];
const colorType = ['100', '200', '300', '400', '500'];

const ColorData: string[] = [];

colorNames.forEach((name) => {
  colorType.forEach((type) => {
    ColorData.push(colorsData[name][type]);
  });
});

const colors: string[] = shuffle(ColorData);
colors.unshift('#afd2ef');

const colorsCutThree: string[][] = [];

for (let i = 0, len = icons.length; i < len; i += 3) {
  colorsCutThree.push(colors.slice(i, i + 3));
}

export { icons, iconsCutThree, colors, colorsCutThree };
