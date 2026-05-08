import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const imagesDir = path.join(process.cwd(),'public/images/offers');

  const files = fs.readdirSync(imagesDir);

  const latestImages = files
    .filter(file =>
      /\.(jpg|jpeg|png|webp|gif)$/i.test(file)
    )
    .sort((a, b) =>
      Number(path.parse(b).name) -
      Number(path.parse(a).name)
    )
    .slice(0, 12)
    .map(file => ({
      src: `/images/offers/${file}`,
      link: '#'
    }));

  res.status(200).json(latestImages);
}