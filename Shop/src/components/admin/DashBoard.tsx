import React from 'react';

const DashBoard: React.FC = () => {
    return (
        <div className="xl:col-span-2">
            <div className="card">
                <div className="card-header">
                    <h5 className="text-base">Revenue</h5>
                </div>
                <div className="card-body relative">
                    <div id="revenue-chart" className="apex-charts min-h-[328px]"><div id="apexchartsuozhaqbuf" className="apexcharts-canvas apexchartsuozhaqbuf apexcharts-theme-light w-[783px] h-[313px]">

                        <div className="resize-triggers"><div className="expand-trigger"><div className='w-[824px] h-[354px]'></div></div><div className="contract-trigger"></div></div></div>
                    </div>
                </div>


            </div>

            <div className="grid xl:grid-cols-2 gap-6">

                <div className="card overflow-hidden">
                    <div className="card-header flex justify-between items-center">
                        <h4 className="card-title">Recent Buyers</h4>
                        <a href="#!" className="btn btn-sm bg-light !text-sm text-gray-800 ">Export</a>
                    </div>

                    <div className="overflow-x-auto custom-scroll">
                        <div className="min-w-full inline-block align-middle whitespace-nowrap">
                            <div className="overflow-hidden">
                                <table className="min-w-full">
                                    <thead className="bg-light/40 border-b border-gray-200">
                                        <tr>
                                            <th className="px-6 py-3 text-start">Product</th>
                                            <th className="px-6 py-3 text-start">Customers</th>
                                            <th className="px-6 py-3 text-start">Categories</th>
                                            <th className="px-6 py-3 text-start">Popularity</th>
                                            <th className="px-6 py-3 text-start">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-gray-200">
                                            <td className="px-6 py-3">iPhone X</td>
                                            <td className="px-6 py-3">Tiffany W. Yang</td>
                                            <td className="px-6 py-3">
                                                <span className="px-2 py-1 bg-success/10 text-success text-xs rounded">Mobile</span>
                                            </td>
                                            <td className="px-6 py-3">
                                                <div className="flex w-full h-1.5 bg-light rounded-full overflow-hidden">
                                                </div>
                                            </td>
                                            <td className="px-6 py-3">$ 1200.00</td>
                                        </tr>
                                        <tr className="border-b border-gray-200">
                                            <td className="px-6 py-3">iPad</td>
                                            <td className="px-6 py-3">Dale P. Warman</td>
                                            <td className="px-6 py-3">
                                                <span className="px-2 py-1 bg-success/10 text-success text-xs rounded">Tablet</span>
                                            </td>
                                            <td className="px-6 py-3">
                                                <div className="flex w-full h-1.5 bg-light rounded-full overflow-hidden">
                                                </div>
                                            </td>
                                            <td className="px-6 py-3">$ 1190.00</td>
                                        </tr>
                                        <tr className="border-b border-gray-200">
                                            <td className="px-6 py-3">OnePlus</td>
                                            <td className="px-6 py-3">Garth J. Terry</td>
                                            <td className="px-6 py-3">
                                                <span className="px-2 py-1 bg-success/10 text-success text-xs rounded">Electronics</span>
                                            </td>
                                            <td className="px-6 py-3">
                                                <div className="flex w-full h-1.5 bg-light rounded-full overflow-hidden">
                                                </div>
                                            </td>
                                            <td className="px-6 py-3">$ 999.00</td>
                                        </tr>
                                        <tr className="border-b border-gray-200">
                                            <td className="px-6 py-3">ZenPad</td>
                                            <td className="px-6 py-3">Marilyn D. Bailey</td>
                                            <td className="px-6 py-3">
                                                <span className="px-2 py-1 bg-success/10 text-success text-xs rounded">Cosmetics</span>
                                            </td>
                                            <td className="px-6 py-3">
                                                <div className="flex w-full h-1.5 bg-light rounded-full overflow-hidden">
                                                </div>
                                            </td>
                                            <td className="px-6 py-3">$ 1150.00</td>
                                        </tr>
                                        <tr className="border-b border-gray-200">
                                            <td className="px-6 py-3">Pixel 2</td>
                                            <td className="px-6 py-3">Denise R. Vaughan</td>
                                            <td className="px-6 py-3">
                                                <span className="px-2 py-1 bg-success/10 text-success text-xs rounded">Appliences</span>
                                            </td>
                                            <td className="px-6 py-3">
                                                <div className="flex w-full h-1.5 bg-light rounded-full overflow-hidden">
                                                </div>
                                            </td>
                                            <td className="px-6 py-3">$ 1180.00</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-3">Pixel 2</td>
                                            <td className="px-6 py-3">Jeffery R. Wilson</td>
                                            <td className="px-6 py-3">
                                                <span className="px-2 py-1 bg-success/10 text-success text-xs rounded">Mobile</span>
                                            </td>
                                            <td className="px-6 py-3">
                                                <div className="flex w-full h-1.5 bg-light rounded-full overflow-hidden">
                                                </div>
                                            </td>
                                            <td className="px-6 py-3">$ 1180.00</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- end card--> */}

                <div className="card overflow-hidden">
                    <div className="card-header flex justify-between items-center">
                        <h4 className="card-title">Account Transactions</h4>
                        <a href="#!" className="btn btn-sm bg-light !text-sm text-gray-800 ">Export</a>
                    </div>

                    <div className="overflow-x-auto">
                        <div className="min-w-full inline-block align-middle whitespace-nowrap">
                            <div className="overflow-hidden">
                                <table className="min-w-full text-sm">
                                    <tbody>
                                        <tr className="border-b border-gray-200">
                                            <td className="px-6 py-3">
                                                <div className="font-medium">4257 **** **** 7852</div>
                                                <div className="text-xs">11 April 2023</div>
                                            </td>
                                            <td className="px-6 py-3">
                                                <div className="font-medium">$79.49</div>
                                                <div className="text-xs">Amount</div>
                                            </td>
                                            <td className="px-6 py-3">
                                                <div className="font-medium">Visa</div>
                                                <div className="text-xs">Card</div>
                                            </td>
                                            <td className="px-6 py-3">
                                                <div className="font-medium">Helen Warren</div>
                                                <div className="text-xs">Pay</div>
                                            </td>
                                        </tr>
                                        <tr className="border-b border-gray-200">
                                            <td className="px-6 py-3">
                                                <div className="font-medium">4427 **** **** 4568</div>
                                                <div className="text-xs">28 Jan 2023</div>
                                            </td>
                                            <td className="px-6 py-3">
                                                <div className="font-medium">$1254.00</div>
                                                <div className="text-xs">Amount</div>
                                            </td>
                                            <td className="px-6 py-3">
                                                <div className="font-medium">Visa</div>
                                                <div className="text-xs">Card</div>
                                            </td>
                                            <td className="px-6 py-3">
                                                <div className="font-medium">Kayla Lambie</div>
                                                <div className="text-xs">Pay</div>
                                            </td>
                                        </tr>
                                        <tr className="border-b border-gray-200">
                                            <td className="px-6 py-3">
                                                <div className="font-medium">4265 **** **** 0025</div>
                                                <div className="text-xs">08 Dec 2022</div>
                                            </td>
                                            <td className="px-6 py-3">
                                                <div className="font-medium">$784.25</div>
                                                <div className="text-xs">Amount</div>
                                            </td>
                                            <td className="px-6 py-3">
                                                <div className="font-medium">Master</div>
                                                <div className="text-xs">Card</div>
                                            </td>
                                            <td className="px-6 py-3">
                                                <div className="font-medium">Hugo Lavarack</div>
                                                <div className="text-xs">Pay</div>
                                            </td>
                                        </tr>
                                        <tr className="border-b border-gray-200">
                                            <td className="px-6 py-3">
                                                <div className="font-medium">7845 **** **** 5214</div>
                                                <div className="text-xs">03 Dec 2022</div>
                                            </td>
                                            <td className="px-6 py-3">
                                                <div className="font-medium">$485.24</div>
                                                <div className="text-xs">Amount</div>
                                            </td>
                                            <td className="px-6 py-3">
                                                <div className="font-medium">Stripe</div>
                                                <div className="text-xs">Card</div>
                                            </td>
                                            <td className="px-6 py-3">
                                                <div className="font-medium">Amber Scurry</div>
                                                <div className="text-xs">Pay</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-3">
                                                <div className="font-medium">4257 **** **** 7852</div>
                                                <div className="text-xs">12 Nov 2022</div>
                                            </td>
                                            <td className="px-6 py-3">
                                                <div className="font-medium">$8964.04</div>
                                                <div className="text-xs">Amount</div>
                                            </td>
                                            <td className="px-6 py-3">
                                                <div className="font-medium">Maestro</div>
                                                <div className="text-xs">Card</div>
                                            </td>
                                            <td className="px-6 py-3">
                                                <div className="font-medium">Caitlyn Gibney</div>
                                                <div className="text-xs">Pay</div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- end card--> */}
            </div>
        </div>
    );
};

export default DashBoard;