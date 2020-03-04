# Typescript Math Toolkit Linked List

I am currently working on the core data structures for the Typescript Math Toolkit.  This is not intended to be a full-featured data-structure library; it will contain the minimal number of structures needed for algorithms and sample applications used in the toolkit.  My goal is to provide alpha releases of these data structures as soon as they pass basic alpha testing.  This public alpha provides an opportunity for feedback about the API and allows for additional testing that will strengthen downstream code that depends upon these structures.

The TSMT Linked List is based on code I wrote in the 1990's and then modified in 2000 for a Flash game.  The Actionscript 1 code was eventually ported to AS 3 and then to Typescript.  It is not templatized (does not use generics), so the data associated with a list node is always typed as _Object_ .  This has been suitable for my past usage of a Linked List, but I am not married to that implementation; hence, the public alpha and openess to feedback.

The default Linked List is singly-connected.  Doubly-connected and circular lists are supported.  The TSMT Linked List caches the most recent node search result and calculates the best direction to search for subsequent requests based on list type and search parameters.


Author:  Jim Armstrong - [The Algorithmist]

@algorithmist

theAlgorithmist [at] gmail [dot] com

Typescript: 2.0.0

Version: 1.0.0


## Installation

Installation involves all the usual suspects

  - npm and gulp installed globally
  - Clone the repository
  - npm install
  - get coffee (this is the most important step)


### Building and Running the unit tests

1. gulp compile

2. gulp serve

The test suite is in Jasmine.  The linked list code is in the _src_ folder. 


### Using the Linked List

General usage follows the pattern,

- A _LinkedListType_ enum is provided to set the list type.  Default is _LinkedListType.SINGLE_ .  Change using the _type()_ mutator.
- Use _add()_ and _remove()_ methods to insert or delete nodes.
- Search for nodes by index (_getNode_) or by id (_getNodeByID_).
- _clear()_ the list to prepare the TSMT Linked List for completely new data.

Special accessors are provided for head and tail nodes.  These are always kept current after insertion or deletion.

Refer to the specs in _llist.specs.ts_ for specific usage examples.


License
----

Apache 2.0

**Free Software? Yeah, Homey plays that**

[//]: # (kudos http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

[The Algorithmist]: <https://www.linkedin.com/in/jimarmstrong>
