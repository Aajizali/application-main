const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('CONSOLE:', msg.type(), msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

    await page.goto('http://localhost:8080', { waitUntil: 'networkidle0', timeout: 10000 });
    
    // Wait for loading screen to finish (4 seconds)
    console.log('Waiting for loading screen...');
    await new Promise(r => setTimeout(r, 5000));

    // Screenshot 1: Welcome screen
    await page.screenshot({ path: 'C:/Users/Aajiz Ali/.gemini/antigravity/brain/8bc2880a-35ca-48a0-9703-2b591cfa6bf3/step1-welcome.png' });
    console.log('Screenshot 1: Welcome screen saved');

    // Try to find and click the Login button
    // The Login button text should be visible
    const loginBtn = await page.evaluate(() => {
      const allDivs = document.querySelectorAll('[role="button"], [tabindex="0"]');
      const results = [];
      allDivs.forEach(el => {
        results.push({
          tag: el.tagName,
          text: el.textContent,
          role: el.getAttribute('role'),
          rect: { w: el.getBoundingClientRect().width, h: el.getBoundingClientRect().height, x: el.getBoundingClientRect().x, y: el.getBoundingClientRect().y }
        });
      });
      return results;
    });
    console.log('Buttons found:', JSON.stringify(loginBtn, null, 2));

    // Click the first button (should be Login)
    if (loginBtn.length > 0) {
      const btn = loginBtn[0];
      console.log(`Clicking button: "${btn.text}" at (${btn.rect.x + btn.rect.w/2}, ${btn.rect.y + btn.rect.h/2})`);
      await page.mouse.click(btn.rect.x + btn.rect.w/2, btn.rect.y + btn.rect.h/2);
      await new Promise(r => setTimeout(r, 1000));
      
      // Screenshot 2: After clicking Login
      await page.screenshot({ path: 'C:/Users/Aajiz Ali/.gemini/antigravity/brain/8bc2880a-35ca-48a0-9703-2b591cfa6bf3/step2-after-login-click.png' });
      console.log('Screenshot 2: After Login click saved');
    } else {
      console.log('No buttons found!');
    }

    await browser.close();
  } catch (error) {
    console.error(error);
  }
})();
