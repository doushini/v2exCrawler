/**
 * Created by luohui on 15/10/1.
 */
function Page(pageNo,totalCount,items){
    this.pageNo = pageNo;
    this.pageSize = 10;
    this.totalCount = totalCount;
    this.items = items;
}
Page.prototype.setTotalCount = function (total) {
  this.totalCount = total;
  this.totalPage = this.totalCount ? (this.totalCount % this.pageSize==0 ? (this.totalCount/this.pageSize) : (this.totalCount/this.pageSize)+1) : 0;
};
Page.prototype.setItems = function (items) {
    this.items = items;
};
module.exports = Page;
