import React from 'react'

export const Footer = () => {

  const currentYear = new Date().getFullYear
  return (
    <footer className="footer footer-center p-4 bg-base-300 text-base-content">
      <aside>
        <p>Copyright © {currentYear} - All right reserved</p>
      </aside>
    </footer>
  )
}
