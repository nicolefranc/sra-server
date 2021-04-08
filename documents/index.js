module.exports = (checklistData) => {
   // console.log(checklistData);
   const today = new Date();

   // <tr class="item">
   //          <td>First item: ${checklistData.checklistData.item1}</td>
   //          <td>${checklistData.checklistData.item1score}</td>
   //       </tr>
   //       <tr class="item">
   //          <td>First item: ${checklistData.checklistData.item1}</td>
   //          <td>${checklistData.checklistData.item1score}</td>
   //       </tr>

   var checklist = ``;


   //if compliant comp = sub / non sub 

   checklistData.checklist.map((category) => {
      checklist += `
      <tr class="heading" style="page-break-before: auto;">
         <td>First item: ${category.category}</td>
         <td>${parseInt(category.score)}</td>
      </tr>
      `
      category.subcategories.map(subcategory => {
         checklist += `
            <tr class="item">
               <td>First item: ${subcategory.subcategory}</td>
               <td>${parseInt(subcategory.subcatScore)}</td>
            </tr>
            
         `
         subcategory.lineItems.map(lineItem => {
            checklist += `
            <tr class=${lineItem.complied? "sub" : "nonsub"}>
               <td>${lineItem.lineItem}</td>
            </tr>
            `
               lineItem.images.map(image => {
                  checklist += `
                     <tr class={comp}>
                        <td>${image.id}</td>
                     </tr>
                     `
               })
         })
      })
   })

  return `
  <!doctype html>
  <html>
     <head>
        <meta charset="utf-8">
        <title>PDF Result Template</title>
        <style>
 
         @page {
            size: A4;
            margin-top: 2in !important;
            margin-bottom: 2in !important;
            margin-left: 1.5in !important;
            margin-right: 1.5in !important; 
          }
           .invoice-box {
           max-width: 100%;
           margin: auto;
           padding: 30px;
         //   border: 1px solid #eee;
           box-shadow: 0 0 10px rgba(0, 0, 0, .15);
           font-size: 16px;
           line-height: 24px;
           font-family: 'Trebuchet MS', sans-serif;
           font-weight: 100;
           }
           .margin-top {
           margin-top: 50px;
           }
           .justify-center {
           text-align: center;
           }
           .invoice-box table {
           width: 100%;
           line-height: inherit;
           text-align: left;
           }
           .invoice-box table td {
           padding: 5px;
           vertical-align: top;
           }
           .invoice-box table tr td:nth-child(2) {
           text-align: right;
           }
           .invoice-box table tr.top table td {
           padding-bottom: 20px;
           }
           .invoice-box table tr.top table td.title {
           font-size: 45px;
           line-height: 45px;
           color: #333;
           }
           .invoice-box table tr.information table td {
           padding-bottom: 40px;
           }
           .invoice-box table tr.heading td {
           background: #eee;
           border-bottom: 1px solid #ddd;
           font-weight: bold;
           }
           .invoice-box table tr.details td {
           padding-bottom: 20px;
           }
           .invoice-box table tr.item td {
           border-bottom: 1px solid #eee;
           }
            .invoice-box table tr.sub td {
            background-color: #F0F8FF ;
            border: 1px solid #eee;
            }
            .invoice-box table tr.nonsub td {
               background-color: #fff0f3 ;
               border: 1px solid #eee;
            }
           .invoice-box table tr.item.last td {
           border-bottom: none;
           }
           .invoice-box table tr.total td:nth-child(2) {
           border-top: 2px solid #eee;
           font-weight: bold;
           }
           @media only screen and (max-width: 600px) {
           .invoice-box table tr.top table td {
           width: 100%;
           display: block;
           text-align: center;
           }
           .invoice-box table tr.information table td {
           width: 100%;
           display: block;
           text-align: center;
           }      
           
        </style>

     </head>
     <body>
        <div class="invoice-box" style="margin-bottom:4rem;">
           <table cellpadding="0" cellspacing="0">
              <tr class="top">
                 <td colspan="2">
                    <table>
                       <tr>
                          <td class="title" style="width:80%; padding-left:40%; page"><img src="https://www.singhealth.com.sg/Style%20Library/Common/images/header/site-logo.png"
                             style="max-width:220px;"></td>
                       </tr>
                    </table>
                 </td>
              </tr>
              <tr>
                 <td colspan="2">
                    <table>
                        <tr>
                           <td>
                           Date audited: ${`${today.getDate()}/${
                              today.getMonth() + 1
                           }/${today.getFullYear()}`}
                           </td>
                        </tr>
                       <tr>
                          <td>
                             Tenant Id: ${checklistData.tenantId}
                          </td>
                       </tr>
                       <tr>
                        <td>
                           Auditor(s): ${checklistData.type}
                        </td>
                       </tr>
                    </table>
                 </td>
              </tr>
               ${checklist}
               
           </table>

           <br />
           <h1 class="justify-center">Total score: ${
             parseInt(checklistData.auditScore)
           }</h1>
        </div>
     </body>
  </html>
  `;
};
