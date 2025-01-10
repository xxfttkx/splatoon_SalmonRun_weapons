import puppeteer from 'puppeteer';
import path from 'path'; // 用于处理文件路径

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  const filePath = path.resolve('salmonRun.html');

  // 加载 HTML 文件
  const response = await page.goto(`file://${filePath}`);

  // await page.setContent((await response.buffer()).toString('utf8'));

  // 设置截图尺寸
  await page.setViewport({
    width: 1400, height: 350
  });

  
  setTimeout(async () => {
    // 截图保存为文件
    await page.screenshot({ path: 'output.png', fullPage: true });
    console.log('Screenshot saved to output.png');
    await browser.close();
  }, 2000); // 延时 2000 毫秒 (2 秒)
  

  
})();
