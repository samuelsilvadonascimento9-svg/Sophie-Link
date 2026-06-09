<?php
function random_cpf() {
    $n = [];
    for($i=0;$i<9;$i++) $n[]=rand(0,9);
    $d1=0;
    for($i=0,$j=10;$i<9;$i++,$j--) $d1+=$n[$i]*$j;
    $d1=11-($d1%11);
    if($d1>=10) $d1=0;
    $n[]=$d1;
    $d2=0;
    for($i=0,$j=11;$i<10;$i++,$j--) $d2+=$n[$i]*$j;
    $d2=11-($d2%11);
    if($d2>=10) $d2=0;
    $n[]=$d2;
    return implode('',$n);
}
echo random_cpf();
