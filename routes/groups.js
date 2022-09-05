const express = require('express');
const passport = require('passport');
const router = express.Router();


// Models
const Group = require('../models/Group');

// Validations
const { validateCreateGroup } = require('../validations/groups');

// Route    :: GET api/groups
// Desc     :: Get all groups, current user is a part of
// Access   :: Private (self)
router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Group.find({ "members": { $elemMatch: { id: req.user.id } } })
            .populate('members.id', ['name'])
            .then(groups => {
                if (groups.length) {
                    return res.json(groups);
                } else {
                    return res.status(400).json({ msg: "No groups found" });
                }
            })
            .catch(err => res.json({ msg: "Internal Server Error", err }));
    }
);


// Route    :: GET api/groups/id
// Desc     :: Get a group by id
// Access   :: Private (grp members)
router.get(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Group.findById(req.params.id)
            .populate('members.id', ['name'])
            .then(group => {
                if (group) {
                    // check if if the user is a member of the group
                    if (group.members.filter(member => member.id.toString() === req.user.id).length) {
                        return res.json(group);
                    } else {
                        return res.status(401).json({ msg: "You are not a member of this group" });
                    }
                } else {
                    return res.status(400).json({ msg: "Group not found" });
                }
            })
            .catch(err => res.json({ msg: "Internal Server Error", err }));
    }
)



// Route    :: POST api/groups
// Desc     :: Create a new group
// Access   :: Private (self)
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    validateCreateGroup,
    (req, res) => {
        Group.findOne({ name: 'Goa Trip' })
            .then(group => {
                if (group) {
                    // TODO: check if any person is in a group with the same name

                    // TODO: if not, Create a new group

                    // FIXME: for temporary puprose without checking above conditions, simply creating a group
                    const newGroup = new Group({
                        name: req.body.name,
                        members: req.body.members.map(member => ({
                            id: member,
                            role: member == req.user.id ? 'admin' : 'member'
                        }))
                    });

                    newGroup.save()
                        .then(group => res.json({ msg: "Group Created Successfully", group }))
                        .catch(err => res.status(500).json({ msg: "Internal Server Error", err }));
                } else {
                    // Create new Group
                    const newGroup = new Group({
                        name: req.body.name,
                        members: req.body.members.map(member => ({
                            id: member,
                            role: member == req.user.id ? 'admin' : 'member'
                        }))
                    });

                    newGroup.save()
                        .then(group => res.json({ msg: "Group Created Successfully", group }))
                        .catch(err => res.status(500).json({ msg: "Internal Server Error", err }));
                }
            })
            .catch(err => res.status(500).json({ msg: "Internal Server Error2", err }));
    }
);


// Route    :: PUT api/groups/add_members
// Desc     :: Add a member to a group
// Access   :: Private (grp Admin)
router.put(
    '/add_members',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Group.findById(req.body.groupId)
            .then(group => {
                if (group) {
                    newMembers = []
                    req.body.members.forEach(member => {
                        if (!group.members.filter(m => m.id == member).length) {
                            newMembers.push({
                                id: member,
                                role: 'member'
                            })
                        }
                    })

                    group.members = group.members.concat(newMembers);
                    group.save()
                        .then(group => res.json({ msg: "Members added successfully", group }))
                        .catch(err => res.status(500).json({ msg: "Internal Server Error", err }));
                } else {
                    return res.status(400).json({ msg: "Group not found" });
                }
            })
            .catch(err => res.status(500).json({ msg: "Internal Server Error", err }));
    }
);


// Route    :: PUT api/groups/remove_members
// Desc     :: Remove a member from a group
// Access   :: Private (grp Admin)
router.put(
    '/remove_members',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Group.findById(req.body.groupId)
            .then(group => {
                if (group) {
                    req.body.members = req.body.members.filter(member => member != req.user.id);

                    group.members = group.members.filter(member => !req.body.members.includes(member.id.toString()));

                    group.save()
                        .then(group => res.json({ msg: "Members removed successfully", group }))
                        .catch(err => res.status(500).json({ msg: "Internal Server Error", err }));
                } else {
                    return res.status(400).json({ msg: "Group not found" });
                }
            })
            .catch(err => res.status(500).json({ msg: "Internal Server Error", err }));
    }
);


// Route    :: DELETE api/groups/:id
// Desc     :: Delete a group
// Access   :: Private (grp Admin)
router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Group.findById(req.params.id)
            .then(group => {
                if (group) {
                    if (group.members.filter(member => member.id.toString() == req.user.id && member.role == 'admin').length) {
                        group.remove()
                            .then(() => res.json({ msg: "Group deleted successfully" }))
                            .catch(err => res.status(500).json({ msg: "Internal Server Error", err }));
                    } else {
                        return res.status(401).json({ msg: "You are not authorized to delete this group" });
                    }
                } else {
                    return res.status(400).json({ msg: "Group not found" });
                }
            })
            .catch(err => res.status(500).json({ msg: "Internal Server Error", err }));
    }
);



module.exports = router;