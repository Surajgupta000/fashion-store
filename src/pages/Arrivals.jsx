import NewArrivals from "../sections/NewArrivals";

export default function Arrivals() {
  return (
    /* Adjusted padding: 
       pt-28 for mobile to clear the fixed Navbar comfortably.
       md:pt-32 for tablet/desktop for a more editorial, spacious feel.
    */
    <div className="pt-28 md:pt-32 min-h-screen bg-white">
      {/* Since NewArrivals section already has internal py-16/24, 
          we keep this wrapper clean to avoid double-padding issues.
      */}
      <NewArrivals />
      
      {/* Optional: Added a subtle bottom buffer to ensure the 
          footer doesn't "snap" too quickly after the last product 
      */}
      <div className="pb-10 md:pb-20"></div>
    </div>
  );
}