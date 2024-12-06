    module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        // screens: {
        //     'sm': '640px',
        //     // => @media (min-width: 640px) { ... }
      
        //     'md': '768px',
        //     // => @media (min-width: 768px) { ... }
      
        //     'lg': '1100px',
        //     // => @media (min-width: 1024px) { ... }
      
        //     'xl': '1280px',
        //     // => @media (min-width: 1280px) { ... }
      
        //     '2xl': '1536px',
        //     // => @media (min-width: 1536px) { ... }
        //   },
        extend: {
           
            colors: {
                'primary': {
                    DEFAULT: '#1E3A8A',
                    hover: '#1E40AF'
                },
                'secondary': {
                    DEFAULT: '#F09720',
                    hover: '#FBBF24'
                },
                blue: {
                    900: '#031B4D',
                },
            }
        },
        fontFamily:{
            poppins:["Poppins","sans-serif"],
            inter:["Inter"],
            ubuntu:["Ubuntu"],
            roboto:["Roboto"]
        }
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
        require('tailwind-scrollbar-hide')
    ],
}