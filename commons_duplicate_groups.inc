<?php
function commons_duplicate_groups_unique() {
  $output = array();
  $group = check_plain($_GET['group']);
  // @todo solr search this
  $query = db_select('node', 'n');
  $query->join('field_data_group_group', 'fg', 'n.nid = fg.entity_id AND (fg.entity_type = :str AND fg.deleted=:int)', array(':str'=>'node', ':int'=> 0));
  $query->fields('n', array('nid', 'title'))
    ->condition('status', 1, '=')
    ->condition('fg.group_group_value', 1, '=')
    ->condition('n.title', '%' . db_like($group) . '%', 'LIKE');

  $results = $query->execute()->fetchAll();
  if ($results) {
    $items = array();
    foreach ($results as $result) {
      $items[] = l(check_plain($result->title), 'node/' . $result->nid);
    }
    $groups .= theme('item_list', array('items' => $items));
    $output['allowed'] = FALSE;
    $output['msg'] = t('Looks like groups may exist that are similar. Why not check these out first: !groups', array('!groups' => $groups));
  }
  else {
    $output['allowed'] = TRUE;
  }
  drupal_json_output($output);
}
