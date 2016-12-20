/** Copyright 2016 Jim Armstrong (www.algorithmist.net)
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

// Specs for alpha release of Typescript Math Toolkit linked list
import {TSMT$ListNode  } from './src/ListNode';
import {TSMT$LinkedList} from './src/LinkedList';
import {LinkedListType } from './src/LinkedList';

// Test Suites
describe('Linked List', () => {
  let list: TSMT$LinkedList = new TSMT$LinkedList();

  it('newly constructed list has zero size', function() {   
    expect(list.size).toEqual(0);
  });

  it('default list type is single', function() {   
    expect(list.type).toEqual(LinkedListType.SINGLE);
  });

  it('first node of empty list is null', function() {   
    expect(list.getNode(0) == null).toEqual(true);
  });

  it('adds a single node correctly', function() {
    list.clear();
    list.add("0", {});
   
    let node: TSMT$ListNode = list.getNode(0);
    let head: TSMT$ListNode = list.head;
    let tail: TSMT$ListNode = list.tail;

    expect(list.size).toEqual(1);
    expect(node.id).toBe("0");
    expect(head.id).toBe("0");
    expect(tail.id).toBe("0");
  });

  it('returns null node for invalid index', function() {
    list.clear();
    list.add("0", {});
   
    let node: TSMT$ListNode = list.getNode(-1);

    expect(node).toBe(null);
  });

  it('adds two nodes correctly', function() {
    list.clear();
    list.add("0", {});
    list.add("1", {});
   
    let node: TSMT$ListNode = list.getNode(1);
    let head: TSMT$ListNode = list.head;
    let tail: TSMT$ListNode = list.tail;

    expect(list.size).toEqual(2);
    expect(node.id).toBe("1");
    expect(head.id).toBe("0");
    expect(tail.id).toBe("1");
  });

  it('properly fetches a node by id', function() {
    list.clear();
    list.add("0", {});
    list.add("1", {});
    list.add("2", {});
   
    let node: TSMT$ListNode = list.getNodeById("1");
    let tail: TSMT$ListNode = list.tail;

    expect(list.size).toEqual(3);
    expect(node.id).toBe("1");
    expect(tail.id).toBe("2");
  });

  it('properly fetches a node by index #1', function() {
    list.clear();
    list.add("0", {});
    list.add("1", {});
    list.add("2", {});
    list.add("3", {});
   
    // test head-forward followed by cached-node forward
    let node1: TSMT$ListNode = list.getNode(0);
    let node2: TSMT$ListNode = list.getNode(1);
    let node3: TSMT$ListNode = list.getNode(2);
    let node4: TSMT$ListNode = list.getNode(3);
    let node5: TSMT$ListNode = list.getNode(3);  // test re-fetch of same node (comes from cache)

    expect(list.size).toEqual(4);
    expect(node1.id).toBe("0");
    expect(node2.id).toBe("1");
    expect(node3.id).toBe("2");
    expect(node4.id).toBe("3");
    expect(node4.id).toBe("3");
  });

  it('properly fetches a node by index #2', function() {
    list.clear();
    list.add("0", {});
    list.add("1", {});
    list.add("2", {});
    list.add("3", {});
    list.add("4", {});
   
    // test head-forward and then unable to use cached node
    let node1: TSMT$ListNode = list.getNode(3);
    let node2: TSMT$ListNode = list.getNode(1);

    expect(list.size).toEqual(5);
    expect(node1.id).toBe("3");
    expect(node2.id).toBe("1");
  });

  it('properly converts from single- to circular-connected list', function() {
    list.clear();
    list.add("0", {});
    list.add("1", {});
    list.add("2", {});
    list.add("3", {});
    list.add("4", {});
   
    let node1: TSMT$ListNode = list.getNode(4);
    let node2: TSMT$ListNode = list.getNode(1);

    expect(list.size).toEqual(5);
    expect(node1.id).toBe("4");
    expect(node2.id).toBe("1");

    list.type = LinkedListType.CIRCULAR;
    let tail: TSMT$ListNode = list.tail;
    expect(tail.next.id).toBe("0");
  });

  it('properly removes a node #1', function() {
    list.clear();
    list.add("0", {});
    list.add("1", {});

    expect(list.size).toEqual(2);
    list.remove(0);
    expect(list.size).toEqual(1);

    let head: TSMT$ListNode = list.head; 
    let tail: TSMT$ListNode = list.tail;

    expect(head.id).toBe("1");
    expect(tail.id).toBe("1");
  });

  it('properly removes a node #2', function() {
    list.clear();
    list.add("0", {});
    list.add("1", {});

    expect(list.size).toEqual(2);
    list.remove(1);
    expect(list.size).toEqual(1);

    let head: TSMT$ListNode = list.head; 
    let tail: TSMT$ListNode = list.tail;

    expect(head.id).toBe("0");
    expect(tail.id).toBe("0");
  });

  it('properly removes a node #3', function() {
    list.clear();
    list.add("0", {});
    list.add("1", {});
    list.add("2", {})

    expect(list.size).toEqual(3);
    list.remove(1);
    expect(list.size).toEqual(2);

    let head: TSMT$ListNode = list.head; 
    let tail: TSMT$ListNode = list.tail;

    expect(head.id).toBe("0");
    expect(tail.id).toBe("1");
  });

  it('properly removes a node #4', function() {
    list.clear();
    list.add("0", {});

    let head: TSMT$ListNode = list.head; 
    let tail: TSMT$ListNode = list.tail;

    expect(list.size).toEqual(1);
    expect(head.id).toBe("0");
    expect(tail.id).toBe("0");

    list.remove(0);
    expect(list.size).toEqual(0);

    head = list.head; 
    tail = list.tail;

    expect(head).toBe(null);
    expect(tail).toBe(null);
  });

  it('properly inserts into an empty list', function() {
    list.clear();
    list.insert(0, "0", {})

    let head: TSMT$ListNode = list.head; 
    let tail: TSMT$ListNode = list.tail;

    expect(list.size).toEqual(1);
    expect(head.id).toBe("0");
    expect(tail.id).toBe("0");
  });

  it('properly inserts into beginning of list', function() {
    list.clear();
    list.add("0", {});
    list.add("1", {});
    list.add("2", {});

    list.insert(0, "0a", {});

    let head: TSMT$ListNode   = list.head; 
    let middle: TSMT$ListNode = list.getNode(2);
    let tail: TSMT$ListNode   = list.tail;

    expect(list.size).toEqual(4);
    expect(head.id).toBe("0a");
    expect(middle.id).toBe("1");
    expect(tail.id).toBe("2");
  });

  it('does not add onto a list with a sentinel tail', function() {
    list.clear();
    list.add("0", {});
    list.add("1", {});
    list.add("2", {}, true);
    list.add("3", {});

    let head: TSMT$ListNode   = list.head; 
    let middle: TSMT$ListNode = list.getNode(1);
    let tail: TSMT$ListNode   = list.tail;

    expect(list.size).toEqual(3);
    expect(head.id).toBe("0");
    expect(middle.id).toBe("1");
    expect(tail.id).toBe("2");
  });

  it('properly converts from singly- to doubly-linked list', function() {
    list.clear();
    list.add("0", {});
    list.add("1", {});
    list.add("2", {});
    list.add("3", {});

    let middle: TSMT$ListNode = list.getNode(2);

    expect(list.size).toEqual(4);
    expect(middle.id).toBe("2");
    expect(middle.prev).toBe(null);
    
    list.type = LinkedListType.DOUBLE;
    expect(middle.prev.id).toBe("1");

    let head: TSMT$ListNode   = list.head; 
    let tail: TSMT$ListNode   = list.tail;

    expect(head.prev).toBe(null);
    expect(tail.prev.id).toBe("2");
  });

  it('properly converts to array', function() {
    list.clear();

    list.type = LinkedListType.DOUBLE;
    list.add("0", {});
    list.add("1", {});
    list.add("2", {});
    list.add("3", {});

    let nodes: Array<TSMT$ListNode> = list.toArray();
    let node: TSMT$ListNode;

    expect(nodes.length).toEqual(4);
    node = nodes.shift();
    expect(node.prev).toBe(null);
    expect(node.next).toBe(null);

    node = nodes.shift();
    expect(node.prev).toBe(null);
    expect(node.next).toBe(null);

    node = nodes.shift();
    expect(node.prev).toBe(null);
    expect(node.next).toBe(null);

    node = nodes.shift();
    expect(node.prev).toBe(null);
    expect(node.next).toBe(null);
  });

  it('properly adds/inserts into to doubly-connected list', function() {
    list.clear();
    list.type = LinkedListType.DOUBLE;

    list.add("0", {});
    list.add("1", {});

    let head: TSMT$ListNode = list.head;
    let tail: TSMT$ListNode = list.tail;

    expect(list.size).toEqual(2);
    expect(head.id).toBe("0");
    expect(head.prev).toBe(null);
    expect(head.next.id).toBe("1");
    expect(tail.id).toBe("1");
    expect(tail.next).toBe(null);
    expect(tail.prev.id).toBe("0");

    list.insert(1, "0a", {});
    let middle: TSMT$ListNode = list.getNode(1);
  
    expect(list.size).toEqual(3);
    expect(middle.id).toBe("0a");
    expect(middle.prev.id).toBe("0");
    expect(middle.next.id).toBe("1");
  });

  it('properly computes search start/end/direction for a doubly-linked list', function() {
    list.clear();

    list.type = LinkedListType.DOUBLE;

    list.add("0", {});
    list.add("1", {});
    list.add("2", {});
    list.add("3", {});
    list.add("4", {});
    list.add("5", {});
    list.add("6", {});
    list.add("7", {});
    list.add("8", {});
    list.add("9", {});

    let node1: TSMT$ListNode = list.getNode(3);   // head-forward
    let node2: TSMT$ListNode = list.getNode(5);   // cached node-forward
    let node3: TSMT$ListNode = list.getNode(5);   // return cached node;
    let node4: TSMT$ListNode = list.getNode(4);   // cached node-backward;
    let node5: TSMT$ListNode = list.getNode(8);   // tail-node, backward

    expect(list.size).toEqual(10);
    expect(node1.id).toBe("3");
    expect(node2.id).toBe("5");
    expect(node3.id).toBe("5");
    expect(node4.id).toBe("4");
    expect(node5.id).toBe("8");
  });

});
