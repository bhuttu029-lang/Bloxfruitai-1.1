# -*- coding: utf-8 -*-
import zlib
import itertools

design_txt = """>JLn b:\KLYK]*; C{fg39 g/~g t~F[ RZ:K ?[l%8 Pcq^=u "NB! Mz86 <|r?+F OJr>9 ;6I-Ku 5m8! ~P{m ~"HGU &J;qa t[i+!m ,Lbgy kdl( "QRK p:^q MA*$d1j N@uN G(rY&[ o$$K H)@$ ^YwH D\!rPZ Q~ '4 I `x0 B8s2F' Z2Ad' .|z_ 7qF{ #>_Lf Eh-| (WO: .O%a Z0lS 7OLY9" '5\c CxN| tM#}w\ Cr"2p /eOK -0"L ["_} (R;  qdw=7 5};* ~Xx/"""

code_txt = """DRgZ \^HCc LUq&) $/?W %E;&3eF K~"#I :9 @x aC%l ,rv@rX `(0lN X8ANh2k `\8@ iq!e 40OQ !vw4 GAd""N ]B]] 7NypU [}e4 J<FN Oun@g ScAq RKj1 |&.n; sy,L sJ~< {b_W DUxn q\}quY N##M #P,n sC44 - ovqJ aH_~$ jbq3 XS(G SN,> CP$V_ =G&FZ| @8gC ^WuX WWqr gL8d%+ )au: lL yX iIX9 l~G. l/wc !M)F 6{S! {k'  sJzx 2gmy Wewa v_rR Em)\ ~/y] mkz. {U7x%L/ 6EE*S it}0 Wa+> !^G3 Q2tc $f\v f6p}3(o =oV^[ 7zZyH ;gBS-6 #z[N vL'@ *_?& Qnvk Z#__ 4ZWX rqY. V\8l eztDJ |kv] `]SQ ?] ; Uu2/ Xy}m s{_m vs^{P% MWiM T[vbI ;:-,; XK-fF WT{, @)N_Kb *wF>~y vf^^ Za^X Ni'N GlwZ ZwSY \n>T$ NT}9 XYuNu M2&Si t6;X 1P~;a 6Py,a s94C gt9L X[.r hD5= Y)AN c'wH \1Yz A _~ =|_x 96D< s<~K4 T'SI tM>rL vzt0 hWLf  y]2 .;]q X9+x M=x., Pw"j Y!;+H !;K` i:w1 |[z. wbFN% VBQ` wRd17 qWoO @5yOE PC3C} {7oDk "Z;{ X}'b 3F:t o+ Y dc@> +s|FQ 9Gmo +"cy ;,+l ~C|9 #u@0<# Lm6@Y ~~!> [l+(M #K]t t}!A t[X/ :evQ 5:Y5" uo@S R'22 RQ=5 9cV,O| WkVI1_ uOi- o)!> kjwZ LAM') '0xKl =nz2 }u~MO {y`hL ZY8R* C/H) -a&eZ /|Qg7 U"n" b)gN G|9bZ %:_UnH jafb Rkp1H T1_. Ne1%N 4;L^ !|{w ted,D [lLHU *Xnp 7S3M h>cJ X1?6 gtaa TVu" </,6 /N$y #~4:$ o84`  WGx ^lP} 7/-$P Sk\Q MBL@I f.!M CIGt AB>4 q,p"' :p]Mzq)m )uEq }6{3 .$CZt |4a= T;4n~"""

for name, txt in [("design", design_txt), ("code", code_txt)]:
    print(f"=== {name} ===")
    for enc in ['latin1', 'cp1252', 'utf-8', 'iso8859_15']:
        try:
            b = txt.encode(enc)
            for wbits in [-15, 15, 31, -8, 8]:
                try:
                    dec = zlib.decompress(b, wbits)
                    print(f"Success with enc={enc} wbits={wbits}: {dec[:100]}")
                except Exception as e:
                    pass
        except Exception as e:
            pass

print("Done trial 1")
