const Order = require("./Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    RECEIPT:   Symbol("receipt"),
    EXTRAS:  Symbol("extras"),
    PRODUCTS: Symbol("products")
});

module.exports = class LockDownEssentials extends Order{
    constructor(sNumber, sUrl){
        super(sNumber, sUrl);
        this.stateCur = OrderState.WELCOMING;
        this.sExtras = "";
        this.total = 0;
        this.sItem = "";
        this.pdt = "";
        this.sflag = 1;
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.PRODUCTS;
                if(this.pdt==""){
                aReturn.push("Welcome to Aravind's Home hardware store.");
                aReturn.push(`Tap below to know the products we sell.`);
                aReturn.push(`${this.sUrl}/payment/${this.sNumber}/`);
                }
                aReturn.push("Type the numbers left to the items that you need\n1.Broom\n2. Shovel\n3. Dustbin\n4. Lightbulb\n ");

                break;
            case OrderState.PRODUCTS:
                    this.stateCur = OrderState.RECEIPT;
                    this.pdt = sInput;
                    if(this.pdt == "1"){
                        this.sItem += "Broom\t"; 
                        this.total += 10;
                    }
                    else if(this.pdt == "2"){
                        this.sItem += "Shovel\t"; 
                        this.total += 14;

                    }
                    else if(this.pdt == "3"){
                        this.sItem += "Dustbin\t"; 
                        this.total += 8;

                    }
                    else if(this.pdt == "4"){
                        this.sItem += "Lightbulb\t"; 
                        this.total += 11;
                    }
                    else {
                        aReturn.push(`Please enter a valid Quantity`);
                        aReturn.push("Type the numbers left to the items that you need\n1.Broom\n2. Shovel\n3. Dustbin\n4. Lightbulb\n ");
                        this.stateCur = OrderState.WELCOMING;
                    
                    }
                    if(this.pdt == "1" || this.pdt =="2" || this.pdt =="3" || this.pdt =="4")
                    {
                    this.stateCur = OrderState.RECEIPT;
                    aReturn.push(`Do you need to shop more ?\nyes or no`);
                    }
                break;
            case OrderState.RECEIPT:
                if(sInput == "yes"){
                aReturn.push("Type the numbers left to the items that you need\n1.Broom\n2. Shovel\n3. Dustbin\n4. Lightbulb\n ");

                this.stateCur = OrderState.PRODUCTS;
                }
                else if(sInput=="no"){
                this.stateCur = OrderState.EXTRAS;
                
                aReturn.push("Your order contains the following\n");
                aReturn.push(`${this.sItem}`);
                aReturn.push("Would you like to order our UP-sell items ?\n1. Earbuds\n2. Descaler for Kettle\n3. No need. Generate Receipt");
                }
                else{
                aReturn.push("1. Earbuds\n2. Descaler for Kettle\n3. No need. Generate Receipt");
                this.stateCur = OrderState.EXTRAS;

                }
                break;
            case OrderState.EXTRAS:
                this.upsell = sInput;
                if(this.upsell == "1"){
                    this.sItem += "Earbuds\t"; 
                    this.total += 15;
                    aReturn.push(`Thank-you for your order of ${this.sItem}`);
                    aReturn.push(`Total is ${this.total}`);                
                    aReturn.push(`We will text you from 519-222-2222 when your order is ready or if we have questions.`)
                    this.isDone(true);
                }
                else if(this.upsell == "2"){
                    this.sItem += "DeScalar for Kettle\t"; 
                    this.total += 13;
                    aReturn.push(`Thank-you for your order of ${this.sItem}`);
                    aReturn.push(`Total is ${this.total}`);                
                    aReturn.push(`We will text you from 519-222-2222 when your order is ready or if we have questions.`)
                    this.isDone(true);
                }
                else if(this.upsell == "3"){
                aReturn.push(`Thank-you for your order of ${this.sItem}`);
                aReturn.push(`Total is ${this.total}`);                
                aReturn.push(`We will text you from 519-222-2222 when your order is ready or if we have questions.`)
                this.isDone(true);
                }
                else{
                    //this.stateCur=OrderState.EXTRAS;
                    aReturn.push("Please enter valid number");
                    
                }
                
                break;
        }
        return aReturn;
    }
    renderForm(){
      // your client id should be kept private
      return(`
      <html><head><meta content="text/html; charset=UTF-8" http-equiv="content-type"><style type="text/css">ol{margin:0;padding:0}table td,table th{padding:0}.c2{border-right-style:solid;padding:5pt 5pt 5pt 5pt;border-bottom-color:#000000;border-top-width:1pt;border-right-width:1pt;border-left-color:#000000;vertical-align:top;border-right-color:#000000;border-left-width:1pt;border-top-style:solid;border-left-style:solid;border-bottom-width:1pt;width:126.8pt;border-top-color:#000000;border-bottom-style:solid}.c4{border-right-style:solid;padding:5pt 5pt 5pt 5pt;border-bottom-color:#000000;border-top-width:1pt;border-right-width:1pt;border-left-color:#000000;vertical-align:top;border-right-color:#000000;border-left-width:1pt;border-top-style:solid;border-left-style:solid;border-bottom-width:1pt;width:127.5pt;border-top-color:#000000;border-bottom-style:solid}.c3{color:#000000;font-weight:400;text-decoration:none;vertical-align:baseline;font-size:12pt;font-family:"Arial";font-style:normal}.c5{padding-top:0pt;padding-bottom:0pt;line-height:1.15;orphans:2;widows:2;text-align:left;height:11pt}.c11{color:#000000;font-weight:700;text-decoration:none;vertical-align:baseline;font-size:17pt;font-family:"Arial";font-style:normal}.c7{color:#000000;font-weight:400;text-decoration:none;vertical-align:baseline;font-size:14pt;font-family:"Arial";font-style:normal}.c10{color:#000000;font-weight:700;text-decoration:none;vertical-align:baseline;font-size:14pt;font-family:"Arial";font-style:normal}.c6{padding-top:0pt;padding-bottom:0pt;line-height:1.15;orphans:2;widows:2;text-align:left}.c8{border-spacing:0;border-collapse:collapse;margin-right:auto}.c0{padding-top:0pt;padding-bottom:0pt;line-height:1.0;text-align:left}.c9{background-color:#ffffff;max-width:451.4pt;padding:72pt 72pt 72pt 72pt}.c1{height:0pt}.title{padding-top:0pt;color:#000000;font-size:26pt;padding-bottom:3pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}.subtitle{padding-top:0pt;color:#666666;font-size:15pt;padding-bottom:16pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}li{color:#000000;font-size:11pt;font-family:"Arial"}p{margin:0;color:#000000;font-size:11pt;font-family:"Arial"}h1{padding-top:20pt;color:#000000;font-size:20pt;padding-bottom:6pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h2{padding-top:18pt;color:#000000;font-size:16pt;padding-bottom:6pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h3{padding-top:16pt;color:#434343;font-size:14pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h4{padding-top:14pt;color:#666666;font-size:12pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h5{padding-top:12pt;color:#666666;font-size:11pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h6{padding-top:12pt;color:#666666;font-size:11pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;font-style:italic;orphans:2;widows:2;text-align:left}</style></head><body class="c9"><p class="c6"><span class="c11">Aravind&rsquo;s Home Hardware @Curbside.</span></p><p class="c5"><span class="c11"></span></p><p class="c6"><span class="c7">Items for Curbside pickup:</span></p><p class="c5"><span class="c7"></span></p><a id="t.5684cecde2ec2d831dd236d77ebef2f8c943a3d7"></a><a id="t.0"></a><table class="c8"><tbody><tr class="c1"><td class="c4" colspan="1" rowspan="1"><p class="c0"><span class="c10">Item</span></p></td><td class="c2" colspan="1" rowspan="1"><p class="c0"><span class="c10">Price</span></p></td></tr><tr class="c1"><td class="c4" colspan="1" rowspan="1"><p class="c0"><span class="c3">Broom</span></p></td><td class="c2" colspan="1" rowspan="1"><p class="c0"><span class="c3">10</span></p></td></tr><tr class="c1"><td class="c4" colspan="1" rowspan="1"><p class="c0"><span class="c3">Shovel</span></p></td><td class="c2" colspan="1" rowspan="1"><p class="c0"><span class="c3">14</span></p></td></tr><tr class="c1"><td class="c4" colspan="1" rowspan="1"><p class="c0"><span class="c3">Bulb</span></p></td><td class="c2" colspan="1" rowspan="1"><p class="c0"><span class="c3">8</span></p></td></tr><tr class="c1"><td class="c4" colspan="1" rowspan="1"><p class="c0"><span class="c3">Dustbin</span></p></td><td class="c2" colspan="1" rowspan="1"><p class="c0"><span class="c3">11</span></p></td></tr></tbody></table><p class="c5"><span class="c7"></span></p><p class="c6"><span class="c7">Items for Up-Sell:</span></p><p class="c5"><span class="c7"></span></p><a id="t.6de447b453c199e2f5b9f12b70b0f24ef86fedef"></a><a id="t.1"></a><table class="c8"><tbody><tr class="c1"><td class="c4" colspan="1" rowspan="1"><p class="c0"><span class="c10">Item</span></p></td><td class="c2" colspan="1" rowspan="1"><p class="c0"><span class="c10">Price</span></p></td></tr><tr class="c1"><td class="c4" colspan="1" rowspan="1"><p class="c0"><span class="c3">Earbuds</span></p></td><td class="c2" colspan="1" rowspan="1"><p class="c0"><span class="c3">15</span></p></td></tr><tr class="c1"><td class="c4" colspan="1" rowspan="1"><p class="c0"><span class="c3">Descaler for Kettle</span></p></td><td class="c2" colspan="1" rowspan="1"><p class="c0"><span class="c3">13</span></p></td></tr></tbody></table><p class="c5"><span class="c7"></span></p></body></html>
           `);
  
    }
}
