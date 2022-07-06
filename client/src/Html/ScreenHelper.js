

function getScreenAccessible(screenName) {
    var data = JSON.parse(localStorage.getItem("userData"));
    if (data != null) {
        if (screenName == "Client") {
            if (data.userType == "user") {
                return true;
            }
            window.location.href = "/";
        }
        else if (screenName == "Login") {
            return false;
        }
        else if (screenName == "SignUp") {
            return false;
        }
        else if (screenName == "EventManager") {
            if (data.userType == "manager") {
                return true;
            }
            window.location.href = "/";
        }
        else if (screenName == "CanvasPage") {
            if (data.userType == "user") {
                return true;
            }
            window.location.href = "/";
        }
        else if (screenName == "Seller") {
            if (data.userType == "seller") {
                return true;
            }
            window.location.href = "/";
        }
        else if (screenName == "Products") {
            if (data.userType == "user") {
                return true;
            }
            window.location.href = "/";
        }
        else if (screenName == "Events") {
            if (data.userType == "user") {
                return true;
            }
            window.location.href = "/";
        }
        else if (screenName == "Product") {
            if (data.userType == "user") {
                return true;
            }
            window.location.href = "/";
        }
        else if (screenName == "Canvases") {
            if (data.userType == "user") {
                return true;
            }
            window.location.href = "/";
        }
        else if (screenName == "ShippingAddress") {
            if (data.userType == "user") {
                return true;
            }
            window.location.href = "/";
        }
        else if (screenName == "Messaging") {
            return true;
        }
        else if (screenName == "Order") {
            if (data.userType == "user") {
                return true;
            }
        }
        
        return false;
    }
    else {
        if (screenName != "Login" && screenName != "SignUp" && screenName != "LandingPage" && screenName != "ForgetPassword" && screenName != "ResetPassword") {
            return false;
        }
        return true;
    }
}

export default getScreenAccessible;