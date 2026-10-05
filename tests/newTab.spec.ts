import{test,expect} from 'playwright/test'

test('Handle new tab',async({page,context})=>{
    await page.goto('https://the-internet.herokuapp.com/windows');
    const [newTab] = await Promise.all([context.waitForEvent('page'),page.getByRole('link',{name:'Click Here'}).click()])
    await newTab.waitForLoadState();
    await expect(newTab.getByRole('heading',{name:'New Window'})).toBeVisible();
    await newTab.close();
})