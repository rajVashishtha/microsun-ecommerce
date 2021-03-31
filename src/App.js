import React from 'react'
import {Route, Switch} from 'react-router'
import HomePage from './pages/homepage/homepage.page'
import loginPage from './pages/login/login.page'
import PaymentPage from './pages/payment/payment.page'
import ProductPage from './pages/product/product.page'
import {connect} from 'react-redux'
import SignupPage from './pages/signup/signup.page'
import CategoryPage from './pages/category/category.page'
import CategorySpecificPage from './pages/category/categorySpecific.page'
import {PrivateRoute} from './component/privateroute/privateroute.component'
import AdminLoginPage from './admin/adminlogin/adminlogin.page'
import AdminDashboardPage from './admin/admin-dashboard/admindashboard.page'
import AdminInventory from './admin/admin-inventory/admininventory.page'
import AdminOrders from './admin/admin-assign-tasks/adminassigntasks.page'
import {AdminRoute} from './component/admin-route/adminroute.component'
class App extends React.Component{
  render(){
    const {currentUser} = this.props;
    return(
		<Switch>
			<Route exact path="/" component={HomePage} />
      <Route exact path="/product" component={ProductPage} />
      <Route exact path="/login" component={loginPage} />
      <Route exact path="/signup" component={SignupPage} />
      <Route exact path="/category" component={CategoryPage} />
      <Route exact path="/category/:id" component={CategorySpecificPage} />
      <PrivateRoute exact path="/payment" auth={currentUser} component={PaymentPage} />
      <Route exact path="/admin/login" component={AdminLoginPage} />
      <AdminRoute exact path="/admin/dashboard" auth={currentUser && currentUser.user_type === 1} component={AdminDashboardPage} />
      <AdminRoute exact path="/admin/inventory" auth={currentUser && currentUser.user_type === 1} component={AdminInventory} />
      <AdminRoute exact path="/admin/orders" auth={currentUser && currentUser.user_type === 1} component={AdminOrders} />
		</Switch>
    )
  }
};
const mapStateToProps = state=>({
  currentUser : state.user.currentUser
})
export default connect(mapStateToProps)(App);

