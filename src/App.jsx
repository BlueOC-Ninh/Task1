import { Component } from "react";
import Card from "./components/Card"
import { IoIosSearch } from "react-icons/io";
import { handleCallApi } from "./service";
class App extends Component {

  state = {
    city: '',
    search: 'Ha Noi',
    data: null,
    error: false
  }

  handleInputChange = (e) => {
    this.setState({ city: e.target.value });
  };

  handleSearch = () => {
    this.setState({search: this.state.city})
  }
  async componentDidUpdate(_, prevState) {
    if (prevState.search !== this.state.search) {
      try {
        this.setState({ error: false });
        const data = await handleCallApi(this.state.search);
        this.setState({ data, city: '' });
      } catch (error) {
        this.setState({ error: true, data: null });
      }
    }
  }
  
  async componentDidMount() {
    try {
      this.setState({ error: false });
      const data = await handleCallApi(this.state.search);
      this.setState({ data, city: '' });
    } catch (error) {
      this.setState({ error: true, data: null });
    }
  }
  
  render() {
    return (
      <>
        <div className="w-screen h-screen bg-gradient-to-b from-[#2E335A] to-[#45278B] flex flex-col items-center p-10 gap-10">
          <h1 className="text-white text-3xl font-semibold leading-[56px]">Wheather App</h1>
          <form className="flex gap-5" onSubmit={(e)=> e.preventDefault()}>
            <div className="relative">
              <IoIosSearch className=" left-2 top-1/2 absolute -translate-y-1/2 text-white font-medium size-5"/>
              <input type="text" className="w-[358px] bg-[#1C1B33] rounded-lg py-2 text-white pl-10 pr-4 outline-none" value={this.state.city}  onChange={this.handleInputChange}/>
            </div>
            <button onClick={this.handleSearch} className="text-white bg-[#1F1D47] text-sm rounded-lg px-4 py-2 cursor-pointer">Search</button>
        </form>
          {
            this.state.error ? <div>
            <img src="https://www.1stopdesign.com/wp-content/uploads/2024/04/1_hFwwQAW45673VGKrMPE2qQ.png" alt="" className="w-[500px] rounded-lg object-cover mb-5" />
            <p className="text-white text-center text-lg font-light">Enter a valid city name to see the weather!</p>
            </div> : <Card data={this.state.data} />
          }
       </div>
  
      </>
    )
  }
}

export default App
