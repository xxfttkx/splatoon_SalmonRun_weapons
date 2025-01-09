import puppeteer from 'puppeteer';
import path from 'path'; // 用于处理文件路径

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  const filePath = path.resolve('output/salmonRun.html');

  // 加载 HTML 文件
  await page.goto(`file://${filePath}`);

  // 设置截图尺寸
  await page.setViewport({
    width: 1400, height: 300
  });

  // 截图保存为文件
  await page.screenshot({ path: 'output/output.png', fullPage: true });

  console.log('Screenshot saved to output.png');

  await browser.close();
})();
