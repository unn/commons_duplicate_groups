<?php
/**
 * @file
 * This module adds an ajax callback for checking if a  similar group exists.
 */


/**
 * Implements hook_menu().
 */
function commons_duplicate_groups_menu() {
  $items = array();
  $items['commons_duplicate_groups/ajax'] = array(
    'type' => MENU_CALLBACK,
    'page callback' => 'commons_duplicate_groups_duplicate',
    'access arguments' => array('create group'),
    'file' => 'commons_duplicate_groups.inc',
  );
  return $items;
}
/**
 * Implements hook_form_FORMID_alter().
 */
function commons_duplicate_groups_form_group_node_form_alter(&$form, &$form_state, $form_id) {
  $module_path = drupal_get_path('module', 'commons_duplicate_groups');
  drupal_add_css($module_path . '/commons_duplicate_groups.css');
  drupal_add_js($module_path . '/commons_duplicate_groups.js');
  drupal_add_js(array(
    'commons_duplicate_groups' => array(
      'ajaxUrl' => url('commons_duplicate_groups/ajax', array('absolute' => TRUE)),
    ),
  ), 'setting');
  $form['title_field']['und'][0]['value']['#field_suffix'] = '<span id="cdg-informer">&nbsp;</span>';
  $form['title_field']['und'][0]['value']['#suffix'] = '<div id="cdg-message"></div>';
}
