type PlayerArrowProps = {
  color?: string
}

function PlayerArrow({ color }: PlayerArrowProps) {
  return (
    <svg fill="none" width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_429_11238)">
        <path
          d="M19 10.2679C20.3333 11.0377 20.3333 12.9623 19 13.7321L10 18.9282C8.66667 19.698 7 18.7358 7 17.1962L7 6.80385C7 5.26425 8.66667 4.302 10 5.0718L19 10.2679Z"
          stroke={color || '#eeeeee'}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_429_11238">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default PlayerArrow
