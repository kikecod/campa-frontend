export default function TreeWithRoots() {
  return (
    <svg
      viewBox="0 0 200 300"
      className="w-32 h-48 mx-auto"
      style={{ maxWidth: '200px' }}
    >
      {/* Crown - Black branches */}
      <g id="crown" stroke="#1a1a1a" strokeWidth="1.5" fill="none" strokeLinecap="round">
        {/* Main trunk */}
        <line x1="100" y1="80" x2="100" y2="150" />

        {/* Left branches */}
        <line x1="100" y1="90" x2="70" y2="50" />
        <line x1="70" y1="50" x2="50" y2="20" />
        <line x1="70" y1="50" x2="60" y2="30" />
        <line x1="100" y1="105" x2="65" y2="75" />
        <line x1="65" y1="75" x2="45" y2="55" />
        <line x1="100" y1="120" x2="70" y2="110" />
        <line x1="70" y1="110" x2="50" y2="100" />

        {/* Right branches */}
        <line x1="100" y1="90" x2="130" y2="50" />
        <line x1="130" y1="50" x2="150" y2="20" />
        <line x1="130" y1="50" x2="140" y2="30" />
        <line x1="100" y1="105" x2="135" y2="75" />
        <line x1="135" y1="75" x2="155" y2="55" />
        <line x1="100" y1="120" x2="130" y2="110" />
        <line x1="130" y1="110" x2="150" y2="100" />
      </g>

      {/* Roots - Orange color */}
      <g id="roots" stroke="#FF6B35" strokeWidth="2" fill="none" strokeLinecap="round">
        {/* Main root going down */}
        <line x1="100" y1="150" x2="100" y2="220" />

        {/* Left roots */}
        <line x1="100" y1="165" x2="60" y2="200" />
        <line x1="60" y1="200" x2="40" y2="240" />
        <line x1="60" y1="200" x2="50" y2="220" />
        <line x1="100" y1="180" x2="70" y2="210" />
        <line x1="70" y1="210" x2="60" y2="240" />

        {/* Right roots */}
        <line x1="100" y1="165" x2="140" y2="200" />
        <line x1="140" y1="200" x2="160" y2="240" />
        <line x1="140" y1="200" x2="150" y2="220" />
        <line x1="100" y1="180" x2="130" y2="210" />
        <line x1="130" y1="210" x2="140" y2="240" />

        {/* Smaller branches */}
        <line x1="100" y1="195" x2="80" y2="230" />
        <line x1="100" y1="195" x2="120" y2="230" />
      </g>
    </svg>
  )
}
