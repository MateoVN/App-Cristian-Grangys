export const ActionButton = ({underway, onStart, onEnd}) =>{
    return underway ?(
      <li onClick={onStart} id="handleOnClickUnderWay"> Poner en marcha </li>
    ):(
      <li onClick={onEnd} id="handleOnClickEndDay"> Dia Finalizado </li>
    );
}