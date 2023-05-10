{template type="summary" version="2" description="A CSS-based report template for embedding in another page."}

{!-- Include this content in another page via PHP or other server-side inclusion, e.g. "<?php include('summary.inc'); ?>". --}


{!-- See the Simon User Guide for more information about the template files, including an explanation of the special markers in this file: <http://www.dejal.com/simon/guide/report-templates.html>. --}


<table border="0" cellspacing="0" cellpadding="1" summary="Dejal Simon summary">

[test]
<tr class="row-{changed format="lowercase"}{failed format="lowercase"}">
<td class="col-icon">{Status type="icon" relative="parent"}</td><td>{Name link="yes" relative="parent"}</td>
</tr>
[/test]

</table>

