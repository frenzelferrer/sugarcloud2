interface ScallopedDividerProps {
  color?: string;
  position?: 'top' | 'bottom';
  className?: string;
}

export function ScallopedDivider({
  color = '#FCF7F8',
  position = 'bottom',
  className = '',
}: ScallopedDividerProps) {
  const svgPath =
    position === 'bottom'
      ? 'M0,0 Q12.5,25 25,25 T50,25 T75,25 T100,25 T125,25 T150,25 T175,25 T200,25 T225,25 T250,25 T275,25 T300,25 T325,25 T350,25 T375,25 T400,25 L400,0 Z'
      : 'M0,25 Q12.5,0 25,0 T50,0 T75,0 T100,0 T125,0 T150,0 T175,0 T200,0 T225,0 T250,0 T275,0 T300,0 T325,0 T350,0 T375,0 T400,0 L400,25 Z';

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 400 25"
        preserveAspectRatio="none"
        className="w-full h-auto"
        style={{ display: 'block' }}
      >
        <path d={svgPath} fill={color} />
      </svg>
    </div>
  );
}
