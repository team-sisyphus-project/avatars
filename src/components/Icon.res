@react.component
let make = (~style=?, ~name) =>
  switch name {
  | "arrow" =>
    <svg
      className="IconLink-icon"
      ?style
      height="12"
      viewBox="0 0 12 12"
      width="12"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="m6.67157288 6-4.29289322-4.29289322c-.3905243-.39052429-.3905243-1.02368927 0-1.41421356.39052429-.39052429 1.02368927-.39052429 1.41421356 0l5.70710678 5.70710678-5.70710678 5.7071068c-.39052429.3905243-1.02368927.3905243-1.41421356 0-.3905243-.3905243-.3905243-1.0236893 0-1.4142136z"
        fill="#5a45ff"
      />
    </svg>
  | "randomize" =>
    <svg
      className="IconLink-icon"
      ?style
      height="16"
      viewBox="0 0 16 16"
      width="16"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="m457.5 1016c-.276142 0-.5-.22386-.5-.5s.223858-.5.5-.5h4.5v4.5c0 .27614-.223858.5-.5.5s-.5-.22386-.5-.5v-2.82637c-2.364947 1.12347-4 3.53397-4 6.32637 0 3.69788 2.867362 6.72604 6.5 6.98242v.01758c.276142 0 .5.22386.5.5s-.223858.5-.5.5c-.056943 0-.111664-.00952-.162656-.02705-4.108263-.33686-7.337344-3.77781-7.337344-7.97295 0-3.01203 1.664575-5.63527 4.123993-7zm13 14c.276142 0 .5.22386.5.5s-.223858.5-.5.5h-4.5v-4.5c0-.27614.223858-.5.5-.5s.5.22386.5.5v2.82637c2.364947-1.12347 4-3.53397 4-6.32637 0-3.69788-2.867362-6.72604-6.5-6.98242v-.01758c-.276142 0-.5-.22386-.5-.5s.223858-.5.5-.5c.056943 0 .111664.00952.162656.02705 4.108263.33686 7.337344 3.77781 7.337344 7.97295 0 3.01203-1.664575 5.63527-4.123993 7z"
        fill="#5a45ff"
        transform="translate(-456 -1015)"
      />
    </svg>
  | "wordmark" =>
    <svg viewBox="0 0 330 100" width="150" xmlns="http://www.w3.org/2000/svg" role="img">
      <rect x="0" y="0" width="100" height="100" rx="22" fill="#f1534a" />
      <rect x="14" y="14" width="20" height="20" rx="5" fill="#ececec" />
      <rect x="40" y="14" width="20" height="20" rx="5" fill="#ececec" />
      <rect x="66" y="14" width="20" height="20" rx="5" fill="#ececec" />
      <rect x="14" y="40" width="20" height="20" rx="5" fill="#ececec" fillOpacity="0.72" />
      <rect x="40" y="40" width="20" height="20" rx="5" fill="#ececec" fillOpacity="0.72" />
      <rect x="14" y="66" width="20" height="20" rx="5" fill="#ececec" fillOpacity="0.55" />
      <path
        d="M76 58v28M64.9 64.5l22.2 15M64.9 79.5l22.2-15"
        stroke="#ececec"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <text x="120" y="63" fill="#f3ece1" fontSize="31" fontWeight="650">
        {React.string("autosquad")}
      </text>
    </svg>
  | _ => React.null
  }
