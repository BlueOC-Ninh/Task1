import  { Component } from 'react';
import { tabs } from '../constants';

class Tabs extends Component {
    render() {
        return (
             <div className="w-full mb-10">
                      <div className="relative right-0">
                        <ul className="relative flex flex-wrap px-1.5 py-1.5 list-none rounded-md bg-slate-100">
                          {tabs.map((tab) => (
                            <li key={tab.value} className="z-30 flex-auto text-center">
                              <button
                                className={`z-30 flex items-center justify-center w-full px-0 py-2 mb-0 text-sm transition-all ease-in-out border-0 rounded-md cursor-pointer ${
                                  this.props.selectedTab === tab.value
                                    ? `text-blue-500 bg-blue-100`
                                    : 'text-slate-600 bg-inherit'
                                }`}
                                onClick={() => this.props.handleChangeTab(tab.value)}
                                role="tab"
                                aria-selected={this.props.selectedTab === tab.value}
                              >
                                {tab.label}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
        );
    }
}

export default Tabs;