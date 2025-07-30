import React from 'react'
import Banner from './Banner'
const Contactdetails = () => {
    return (
        <div class="bg-gray-800 shadow  py-12  border-gray-700">
            <div class="container mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-2 gap-4 text-sm text-gray-300">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                        <h4 class="text-lg font-semibold text-green-400 mb-2">Contact Us</h4>
                        <div class="flex items-start space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mt-1 text-green-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5s-3 1.343-3 3 1.343 3 3 3z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.5 10.5c0 7-7.5 11.5-7.5 11.5S4.5 17.5 4.5 10.5a7.5 7.5 0 1115 0z" />
                            </svg>
                            <div className="space-y-2">
                                <p>Global Tech Solutions</p>
                                <p>18 Horizon Drive</p>
                                <p>Sector 22B, New City</p>
                                <p>Countryland, ZIP 123456</p>
                            </div>
                        </div>
                    </div>

                    <div >
                        <h4 class="text-lg invisible mb-2">Contact Info</h4>

                        <div class="flex items-center space-x-2 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3l2 5-2 2c1.5 2.5 3.5 4.5 6 6l2-2 5 2v3a2 2 0 01-2 2h-1C9 21 3 15 3 7V5z" />
                            </svg>
                            <p><strong>Phone:</strong> <span>+91 85919 77889</span></p>
                        </div>

                        <div class="flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4h16v16H4z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M22 6l-10 7L2 6" />
                            </svg>
                            <p><strong>Email:</strong> <span>info@dummycorp.io</span></p>
                        </div>
                    </div>
                </div>

                <div>
                    <h4 className="text-lg font-semibold text-green-400 mb-2">Follow Us</h4>

                    <a href="#" className="hover:text-green-400 flex items-center space-x-2 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5 text-green-400" viewBox="0 0 24 24">
                            <path d="M7.75 2A5.75 5.75 0 0 0 2 7.75v8.5A5.75 5.75 0 0 0 7.75 22h8.5A5.75 5.75 0 0 0 22 16.25v-8.5A5.75 5.75 0 0 0 16.25 2h-8.5zm0 1.5h8.5A4.25 4.25 0 0 1 20.5 7.75v8.5A4.25 4.25 0 0 1 16.25 20.5h-8.5A4.25 4.25 0 0 1 3.5 16.25v-8.5A4.25 4.25 0 0 1 7.75 3.5zm8.25 3.25a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 1.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7z" />
                        </svg>
                        <span>Instagram</span>
                    </a>

                    <a href="#" className="hover:text-green-400 flex items-center space-x-2 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5 text-green-400" viewBox="0 0 24 24">
                            <path d="M19 0h-14C2.239 0 1 1.239 1 3v18c0 1.761 1.239 3 3 3h14c1.761 0 3-1.239 3-3V3c0-1.761-1.239-3-3-3zM8 19H5v-9h3v9zM6.5 8C5.671 8 5 7.328 5 6.5S5.671 5 6.5 5 8 5.672 8 6.5 7.329 8 6.5 8zM19 19h-3v-4.5c0-1.5-2-1.5-2 0V19h-3v-9h3v1.5c1-1.75 5-1.875 5 1.75V19z" />
                        </svg>
                        <span>LinkedIn</span>
                    </a>

                    <a href="#" className="hover:text-green-300 flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5 text-green-300" viewBox="0 0 24 24">
                            <path d="M24 4.557a9.934 9.934 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.916 4.916 0 0 0-8.38 4.482A13.945 13.945 0 0 1 1.671 3.15a4.902 4.902 0 0 0-.664 2.475 4.916 4.916 0 0 0 2.188 4.096 4.903 4.903 0 0 1-2.228-.616v.062a4.917 4.917 0 0 0 3.946 4.827 4.996 4.996 0 0 1-2.224.084 4.92 4.92 0 0 0 4.6 3.417 9.867 9.867 0 0 1-6.1 2.105c-.396 0-.788-.023-1.175-.068A13.945 13.945 0 0 0 7.548 21c9.142 0 14.307-7.721 13.995-14.646A9.936 9.936 0 0 0 24 4.557z" />
                        </svg>
                        <span>Twitter</span>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Contactdetails