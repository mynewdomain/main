async function ToJSON(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching JSON:", error);
        throw error;
    }
}
function dateFormat(apiDate){
    var dateString="";
    var date=new Date(apiDate);
    var day=date.getDate();
    var month=date.getMonth()+1; // Months are zero-based in JavaScript
    var year=date.getFullYear();
    dateString=day+"/"+month+"/"+year;
    return dateString;
}