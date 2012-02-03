function Tripwire(obj) {
    this.tripPoint = obj.tripPoint || 1;
    this.lastScrollPoint = 0;
    this.currScrollPoint = this._getCurrentScrollPoint();
    this.scrollDir = 'down';
    this.tripUp = obj.tripUp || function(){};
    this.tripDown = obj.tripDown || function(){};
    this.tripContainer = this._setContainer(obj.tripContainer);
    this._attachToScrollEvent();
};

Tripwire.prototype._setContainer = function(el) {
    el = el || window;
    if(el !== window && el !== document) {
        el = el.indexOf('#') === 0 ? el : "#" + el;
    }
    return el;
};

Tripwire.prototype._getCurrentScrollPoint = function() {
    return $(this.tripContainer).scrollTop();
};

Tripwire.prototype._attachToScrollEvent = function() {
    var _this = this;
    $(this.tripContainer).scroll(function(e) {
        _this._handleScrollEvent();
    });
};

Tripwire.prototype._updateScrollPoints = function() {
    this.lastScrollPoint = this.currScrollPoint;
    this.currScrollPoint = this._getCurrentScrollPoint();
    this.scrollDir = this._getScrollDir() ? "up" : "down";
}

Tripwire.prototype._getScrollDir = function() {
    return this.currScrollPoint < this.lastScrollPoint;
};

Tripwire.prototype._checkTripPoint = function() {
    if(this._didCrossTripPoint()) {
        this.scrollDir == "down" ? this.tripDown() : this.tripUp();
    }
};

Tripwire.prototype._handleScrollEvent = function() {
    this._updateScrollPoints();
    this._checkTripPoint();
}

Tripwire.prototype._didCrossTripPoint = function() {
    var retVal = false;
    switch(this.scrollDir) {
        case 'up':
            retVal = (this.lastScrollPoint > this.tripPoint && this.currScrollPoint <= this.tripPoint);
            break;
        case 'down':
            retVal = (this.lastScrollPoint < this.tripPoint && this.currScrollPoint >= this.tripPoint);
            break;
    }
    return retVal;
}
