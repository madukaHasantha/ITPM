import React from 'react';
import MUIDataTable from 'mui-datatables';
import axios from "axios";

/*
  It uses npm mui-datatables. It's easy to use, you just describe columns and data collection.
  Checkout full documentation here :
  https://github.com/gregnb/mui-datatables/blob/master/README.md
*/
class AdvFilter extends React.Component {
  state = {
    columns: ['catagory','toWhome', 'from', 'message', 'date'],
    data: []
  }

  componentDidMount() {
    this.retrieveAnnouncements();
  }

  retrieveAnnouncements() {
    axios
      .get(`http://localhost:8090/announcement/getAllAnnouncement`)
      .then((res) => {
        if (res.data.success) {
          this.setState({
            data: res.data.existingAnnouncement,
          });
          console.log(this.state.data);
        }
      });
  }



  render() {
    const { columns, data } = this.state;
    const options = {
      filterType: 'dropdown',
      responsive: 'stacked',
      print: true,
      rowsPerPage: 10,
      page: 1
    };
    return (

      
      <div className="row bg-secondary bg-opacity-10">
            
            <div className="m-2 ">
              <h3 align="center" ></h3>
                
              <MUIDataTable
                title="Gift Items Statistics Report"
                data={data}
                columns={columns}
                options={options}
            />
        
            </div>
            </div>
    );
  }
}

export default AdvFilter;