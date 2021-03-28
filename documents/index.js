module.exports = (checklistData) => {
  console.log(checklistData.total);
  const today = new Date();
  return `
  <!doctype html>
  <html>
     <head>
        <meta charset="utf-8">
        <title>PDF Result Template</title>
        <style>
           .invoice-box {
           max-width: 100%;
           margin: auto;
           padding: 30px;
           border: 1px solid #eee;
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
           }
        </style>
     </head>
     <body>
        <div class="invoice-box">
           <table cellpadding="0" cellspacing="0">
              <tr class="top">
                 <td colspan="2">
                    <table>
                       <tr>
                          <td class="title" style="width:80%; padding-left:40%;"><img src="https://www.singhealth.com.sg/Style%20Library/Common/images/header/site-logo.png"
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
                             Tenant Id: ${checklistData.somth}
                          </td>
                       </tr>
                       <tr>
                        <td>
                           Auditor(s): ${checklistData.somth}
                        </td>
                       </tr>
                    </table>
                 </td>
              </tr>

              <tr class="heading">
                 <td>Hygiene and cleaniness:</td>
                 <td>Score</td>
              </tr>
              <tr class="item">
                 <td>First item: ${checklistData.item1}</td>
                 <td>${checklistData.item1score}</td>
              </tr>
              <tr class="item">
                 <td>Second item: ${checklistData.item2}</td>
                 <td>${checklistData.item2score}</td>
              </tr>
           </table>

           <br />
           <h1 class="justify-center">Total score: ${
             parseInt(checklistData.total)
           }</h1>
        </div>
     </body>
  </html>
  `;
};
