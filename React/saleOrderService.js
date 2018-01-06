const saleOrderService = (function () {

    var saleOrdersLoaded = function (data) {
        console.log('saleOrderService :: saleOrdersLoaded(', data, ')');
    },

        saleOrders = [],

        findById = function (id) {
            //var deferred = $.Deferred();
            var saleOrder = null;
            var l = saleOrders.length;
            saleOrder = saleOrders[0];
            for (var i = 0; i < l; i++) {
                if (saleOrders[i].number.toString() == id.toString()) {
                    saleOrder = saleOrders[i];
                    break;
                }
            }
            //deferred.resolve(saleOrder);
            //return deferred.promise();
            return saleOrder;
        },

        findByUserName = function (searchKey) {
            var deferred = $.Deferred();
            var results = saleOrders.filter(function (element) {
                return element.userName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
            });
            deferred.resolve(results);
            return deferred.promise();
        },

        load = function (appName, packageName, appVersion, login, password) {
            console.log("Ajaxing server!");
            $.ajax("/api/Ajax/SaleOrders", {
                type: "GET",
                contentType: 'application/json',
                beforeSend: function (xhr) {
                    //var bytes = Crypto.charenc.Binary.stringToBytes(login + ":" + password);
                    //var base64 = Crypto.util.bytesToBase64(bytes);
                    //xhr.setRequestHeader("Authorization", "Basic " + base64);
                    var b = btoa(login + ":" + password);
                    console.log(b);
                    xhr.setRequestHeader("Authorization", "Basic " + b);
                    xhr.setRequestHeader("login", login);
                    //xhr.setRequestHeader("password", password);
                    xhr.setRequestHeader("application", appName);
                    xhr.setRequestHeader("package", packageName);
                    xhr.setRequestHeader("version", appVersion);
                },
                success: function (result) {
                    console.log("Data loaded from server...", result.data.length);
                    saleOrderService.saleOrdersLoaded(result.data);
                    saleOrders = result.data;
                },
                error: function (xhr, status, error) {
                    console.log("Error loading data from server!");
                    console.log(status);
                    console.log(error);
                    alert(error);
                }
            });
        }

    // The public API
    return {
        saleOrdersLoaded: saleOrdersLoaded,
        findById: findById,
        findByUserName: findByUserName,
        load: load
    };
}());

export default saleOrderService;