var words = "Alki Anacortes Asotin Brier Buena Burien Camano Camas Cathlamet Centralia Chehalis Chelan Chewelah Chimacum Chinook Colville Connell Coulee Cowiche Cowlitz Duwamish Elbe Elochoman Entiat Enumclaw Ephrata Hoquiam Ilwaco Inchelium Issaquah Kachess Kalalach Kalama Keechelus Kiona Kittitas Klickitat Lilliwaup Machias Makah Mattawa Mazama Mesa Methow Montesano Mukilteo Naches Naselle Napavine Nespelem Niawakum Nisqually Okanogan Olalla Olequa Orcas Oso Palix Palouse Pasco Pe Ell Pend Oreille Peshastin Poulsbo Puget Puyallup Pysht Quilcene Quinault Rainier Roche Harbor Salish Sammamish Satus Sauk Seattle Selah Sekiu Sequim Si Skagit Skamokawa Skykomish Snohomish Snoqualmie Spanaway Spokane Stehekin Sumas Swinomish Tacoma Teanaway Tekoa Tenino Tieton Tlingit Tonasket Toppenish Touchet Toutle Tshletshy Tukwila Tulalip Utsalady Vancouver Vashon Wahkiakum Wapato Washougal Wenaha Wenatchee Willapa Yacolt Yakima"
var dictionary = [...new Set(words.toLowerCase().split(" ").filter(d => d))];

var guid = (Math.random() * dictionary.length) | 0;
module.exports = function() {
  var word = dictionary[(guid++) % dictionary.length];
  return word;
}