//var csv is the CSV file with headers
function csvJSON(csv){

    var lines=csv.split("\n");
  
    var result = [];
  
    // NOTE: If your columns contain commas in their values, you'll need
    // to deal with those before doing the next step 
    // (you might convert them to &&& or something, then covert them back later)
    // jsfiddle showing the issue https://jsfiddle.net/
    var headers=lines[0].split(String.fromCodePoint(9))
  
    for(var i=1;i<lines.length;i++){
  
        var obj = {}
        var currentline=lines[i].split(String.fromCodePoint(9))
  
        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j]
        }
  
        result.push(obj)
  
    }
  
    //return result; //JavaScript object
    return result; //JSON
}

function fetchSheet(sheetID) {
    var url = "https://docs.google.com/spreadsheets/d/e/" + sheetID + "/pub?output=tsv"
    return fetch(url).then(response => {
        return response.text().then(csv => {
            return csvJSON(csv)
        })
    })
}

export default fetchSheet