import {test,expect} from '@playwright/test'
test('Handle alerts',async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    page.on('dialog',async(dialog)=>{
        console.log(dialog.message());
        await dialog.accept();
       

    })
        await page.getByRole('button',{name:'Click for JS Alert'}).click();

})